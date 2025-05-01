import { CreateNewPost } from "@/modules/post/types";

const makePostFormData = (values: CreateNewPost): FormData => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("thumbnail", values.thumbnail);
  formData.append("description", values.description);
  formData.append("category", values.category);
  formData.append("slug", values.slug);
  formData.append("authorId", values.authorId);

  values.tags.forEach((tag) => formData.append("tags", tag));

  values.content.forEach((section, index) => {
    formData.append(`content[${index}][title]`, section.title);
    formData.append(`content[${index}][description]`, section.description);

    section.images.forEach((file, imgIndex) => {
      formData.append(`content[${index}][images][${imgIndex}]`, file);
    });
  });

  return formData;
};

export default makePostFormData;
