/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import DiscussionSection from "./Discussion";
import { useGetSingleDiscussion } from "@/modules/discussion/hooks";
import Answers from "./Answers";
import DiscussionDetailsLoadingSkeleton from "@/skeletons/DiscussionDetailsLoadingSkeleton";

const answersData: any = [
  {
    id: "1",
    content: `
      <p>To test a NestJS service with Jest, you typically use the <code>Test.createTestingModule</code> method provided by <code>@nestjs/testing</code>. Here's a simple example:</p>
      <pre><code>const module = await Test.createTestingModule({
  providers: [MyService],
}).compile();

const service = module.get(MyService);</code></pre>
      <p>Then you can write unit tests like:</p>
      <pre><code>it('should return expected result', () => {
  expect(service.myMethod()).toEqual(expected);
});</code></pre>
    `,
    user: {
      id: "u1",
      name: "Alice",
    },
    createdAt: new Date("2025-05-17T10:00:00Z"),
    updatedAt: new Date("2025-05-17T10:00:00Z"),
  },
  {
    id: "2",
    content: `
      <p>Make sure to mock dependencies properly. NestJS services often depend on other services or repositories. Use <code>useValue</code> to provide mock implementations:</p>
      <pre><code>const mockRepo = {
  find: jest.fn().mockResolvedValue([...]),
};

const module = await Test.createTestingModule({
  providers: [
    MyService,
    { provide: MyRepository, useValue: mockRepo },
  ],
}).compile();</code></pre>
    `,
    user: {
      id: "u2",
      name: "Ben",
    },
    createdAt: new Date("2025-05-17T11:00:00Z"),
    updatedAt: new Date("2025-05-17T11:00:00Z"),
  },
  {
    id: "3",
    content: `
      <p>Use Jest's mocking features to isolate your service logic. For example, if your service uses an HTTP call or DB access, mock it:</p>
      <pre><code>jest.spyOn(httpService, 'get').mockResolvedValue(...)</code></pre>
      <p>This ensures you are testing only your business logic, not external integrations.</p>
    `,
    user: {
      id: "u3",
      name: "Clara",
    },
    createdAt: new Date("2025-05-17T12:00:00Z"),
    updatedAt: new Date("2025-05-17T12:00:00Z"),
  },
  {
    id: "4",
    content: `
      <p>For async methods, don’t forget to use <code>async/await</code> and mock resolved values:</p>
      <pre><code>it('should return data', async () => {
  mockRepo.find.mockResolvedValueOnce([data]);
  const result = await service.getData();
  expect(result).toEqual([data]);
});</code></pre>
      <p>Failing to await will result in false positives or unhandled promise errors.</p>
    `,
    user: {
      id: "u4",
      name: "Derek",
    },
    createdAt: new Date("2025-05-17T13:00:00Z"),
    updatedAt: new Date("2025-05-17T13:00:00Z"),
  },
  {
    id: "5",
    content: `
      <p>You can test exceptions and edge cases as well:</p>
      <pre><code>it('should throw NotFoundException', async () => {
  mockRepo.findOne.mockResolvedValue(null);
  await expect(service.getItem('invalid-id')).rejects.toThrow(NotFoundException);
});</code></pre>
      <p>This ensures that your error handling logic works correctly.</p>
    `,
    user: {
      id: "u5",
      name: "Ella",
    },
    createdAt: new Date("2025-05-17T14:00:00Z"),
    updatedAt: new Date("2025-05-17T14:00:00Z"),
  },
];

const DiscussionDetails = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { discussion, isLoading } = useGetSingleDiscussion(id);

  const answers =
    discussion?.answers?.length > 0 ? discussion?.answers : answersData;

  return (
    <Box>
      {isLoading ? (
        <DiscussionDetailsLoadingSkeleton />
      ) : (
        <>
          <DiscussionSection discuss={discussion} />
          <Answers answers={answers} />
        </>
      )}
    </Box>
  );
};

export default DiscussionDetails;
