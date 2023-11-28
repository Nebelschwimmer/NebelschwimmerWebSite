import { useForm } from "react-hook-form";
export const EditMusicForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm({ mode: "onSubmit" });
  
  return (
  <>
  <form>
  <input
            type="text"
            className="edit_form_input"
            defaultValue={trackList.name}
            placeholder="Название"
            {...register("name", { required: true })}
        />
  </form>
  </>)

}