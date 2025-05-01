import { categories } from "@/constants/categories";
import { CreateNewPost } from "@/modules/post/types";
import { Autocomplete, TextField } from "@mui/material";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<CreateNewPost>;
  errors: FieldErrors<CreateNewPost>;
  setValue: UseFormSetValue<CreateNewPost>;
  watch: UseFormWatch<CreateNewPost>;
};

const Category = ({ errors, setValue, watch, register }: Props) => {
  const selectedCategory = watch("category");

  return (
    <Autocomplete
      disablePortal
      size="small"
      options={categories.filter(
        (cat) => !["All Categories", "International"].includes(cat)
      )}
      value={selectedCategory || null}
      {...register("category", { required: "Category is required" })}
      onChange={(_, value) =>
        setValue("category", value || "", { shouldValidate: true })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          error={!!errors.category}
          helperText={errors.category?.message}
        />
      )}
    />
  );
};

export default Category;
