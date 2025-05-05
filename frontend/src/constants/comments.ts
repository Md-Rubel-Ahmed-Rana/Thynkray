import { Comment } from "@/modules/comment/types";

export const comments: Comment[] = [
  {
    id: "c1",
    post: { id: "p1", title: "Pioneering sustainable engineering solutions" },
    user: {
      id: "u1",
      name: "Alice Johnson",
      profile_image: "",
    },
    content:
      "This is exactly the kind of innovation the world needs right now.",
    createdAt: new Date("2025-04-25T10:15:00Z"),
    updatedAt: new Date("2025-04-25T10:15:00Z"),
  },
  {
    id: "c2",
    post: { id: "p1", title: "Pioneering sustainable engineering solutions" },
    user: {
      id: "u2",
      name: "Marcus Lee",
      profile_image: "",
    },
    content:
      "Incredible insights on how engineering can shape a greener future.",
    createdAt: new Date("2025-04-09T11:02:00Z"),
    updatedAt: new Date("2025-04-09T11:02:00Z"),
  },
];
