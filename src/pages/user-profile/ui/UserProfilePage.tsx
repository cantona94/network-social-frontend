import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { MdOutlinePersonAddDisabled } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { EditProfile } from "@/features/edit-profile";
import { resetUser, selectCurrent } from "@/entities/user/model/slice";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/shared/api/user-api";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/shared/api/follow-api";
import { GoBack } from "@/shared/ui/go-back";
import { ProfileInfo } from "@/shared/ui/profile-info";
import { CountInfo } from "@/shared/ui/count-info";
import { ErrorMessage } from "@/shared/ui/error-message";
import { BASE_URL } from "@/shared/config/base-url";
import { formatToClientDate } from "@/shared/lib/format-to-client-date";
import { hasErrorField } from "@/shared/lib/has-error-field";

export const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [followUser] = useFollowUserMutation();
  const [unfolowUser] = useUnfollowUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetUser());
    },
    []
  );

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfolowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap();

        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (err) {
      if (hasErrorField(err)) {
        console.log(err);
        setError(err.data.error);
      }
    }
  };

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        onClose();
      }
    } catch (err) {
      if (hasErrorField(err)) {
        console.log(err);
        setError(err.data.error);
      }
    }
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <GoBack />
      <div className="flex items-stretch gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data?.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <>
                <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                  Редактировать
                </Button>
                <ErrorMessage error={error} />
              </>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта:" info={data.email} />
          <ProfileInfo title="Местоположение:" info={data.location} />
          <ProfileInfo
            title="Дата рождения:"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне:" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  );
};
