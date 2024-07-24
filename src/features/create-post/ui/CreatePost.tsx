import { Button, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "@/shared/api/post-api";
import { ErrorMessage } from "@/shared/ui/error-message";
import { IoMdCreate } from "react-icons/io";

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const error = errors?.post?.message as string;

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap();
      setValue("post", "");
      await triggerGetAllPosts().unwrap();
    } catch (error) {
      console.log("err", error);
    }
  });

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Что нового?"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  );
};
