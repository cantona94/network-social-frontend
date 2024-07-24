import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button, Textarea } from "@nextui-org/react";
import { IoMdCreate } from "react-icons/io";
import { useCreateCommentMutation } from "@/shared/api/comment-api";
import { useLazyGetPostByIdQuery } from "@/shared/api/post-api";
import { ErrorMessage } from "@/shared/ui/error-message";

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getPostById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.comment?.message as string;

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap();
        await getPostById(id).unwrap();
        setValue("comment", "");
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Поле обязательно",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Оставить комментарий"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Отправить
      </Button>
    </form>
  );
};
