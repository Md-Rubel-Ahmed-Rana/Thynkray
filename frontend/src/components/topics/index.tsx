import { useGetAllDiscussions } from "@/modules/discussion/hooks";

const Topics = () => {
  const { discussions, isLoading } = useGetAllDiscussions();
  return (
    <div>
      {isLoading ? (
        <h1>Discussions loading...</h1>
      ) : (
        <div>
          <h1>This is topics page</h1>
          <h3>Total: {discussions?.length || 0}</h3>
        </div>
      )}
    </div>
  );
};

export default Topics;
