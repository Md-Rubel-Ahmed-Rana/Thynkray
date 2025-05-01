import { CreateNewPost } from "@/modules/post/types";

const makePostFormData = (values: CreateNewPost): FormData => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("thumbnail", values.thumbnail);
  formData.append("description", values.description);
  formData.append("category", values.category);

  if (values.slug) formData.append("slug", values.slug);
  if (values.authorId) formData.append("authorId", values.authorId);

  formData.append("tags", JSON.stringify(values.tags));

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
