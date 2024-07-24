import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      onClick={handleGoBack}
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
    >
      <FaRegArrowAltCircleLeft />
      Назад
    </div>
  );
};
