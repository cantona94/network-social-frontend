import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { selectCurrent } from "@/entities/user/model/slice";
import { User } from "@/shared/ui/user";

export const FollowingPage = () => {
  const currentUser = useSelector(selectCurrent);

  if (!currentUser) {
    return null;
  }

  return currentUser.following.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.following.map(user => (
        <Link to={`/user/${user.following.id}`} key={user.following.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.following.name ?? ""}
                avatarUrl={user.following.avatarUrl ?? ""}
                description={user.following.email ?? ""}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>У Вас нет ещё ни одной подписки</h2>
  );
};
