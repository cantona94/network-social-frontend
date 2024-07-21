import { Login } from "@/features/login";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

export const AuthPage = () => {
  const [selected, setSelected] = useState<string>("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key="login" title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регистрация">
                Register
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
