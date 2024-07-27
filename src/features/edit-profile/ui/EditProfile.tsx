import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ThemeContext } from "@/shared/config/theme-context";
import { useUpdateUserMutation } from "@/shared/api/user-api";
import { User } from "@/shared/models/model-api";
import { hasErrorField } from "@/shared/lib/has-error-field";
import { Input } from "@/shared/ui/input";
import { ErrorMessage } from "@/shared/ui/error-message";
import { MdOutlineEmail } from "react-icons/md";

interface IUserForm extends Omit<User, "dateOfBirth"> {
  dateOfBirth?: Date | string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
};

export const EditProfile: React.FC<Props> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const { theme } = useContext(ThemeContext);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();

  const { handleSubmit, control } = useForm<IUserForm>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth:
        user?.dateOfBirth === null
          ? new Date("1970-01-01").toISOString().slice(0, 10)
          : user?.dateOfBirth &&
            new Date(user.dateOfBirth).toISOString().slice(0, 10),
      bio: user?.bio === null ? "" : user?.bio,
      location: user?.location === null ? "" : user?.location,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: IUserForm) => {
    if (id) {
      try {
        const formData = new FormData();
        data.name && formData.append("name", data.name);
        data.email &&
          data.email !== user?.email &&
          formData.append("email", data.email);
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString()
          );
        selectedFile && formData.append("avatar", selectedFile);
        data.bio && formData.append("bio", data.bio);
        data.location && formData.append("location", data.location);

        await updateUser({ userData: formData, id }).unwrap();
        onClose();
      } catch (err) {
        if (hasErrorField(err)) {
          setError(err.data.error);
        }
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
      backdrop="blur"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Изменения профиля
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                  required="Обязательное поле"
                />
                <Input
                  control={control}
                  name="name"
                  label="Имя"
                  type="text"
                  required="Обязательное поле"
                />
                <input
                  name="avatarUrl"
                  placeholder="Выберете файл"
                  type="file"
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  name="dateOfBirth"
                  label="Дата Рождения"
                  type="date"
                  placeholder="Дата Рождения"
                  required="Обязательное поле"
                />
                <Input
                  control={control}
                  name="location"
                  label="Местоположение"
                  type="text"
                  required="Обязательное поле"
                />
                <Input
                  control={control}
                  name="bio"
                  label="О себе"
                  type="text"
                  required="Обязательное поле"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
