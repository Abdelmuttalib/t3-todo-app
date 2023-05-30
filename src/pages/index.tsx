import { Layout } from "@/components/layout";
import type { GetStaticProps } from "next";
import Seo from "@/components/Seo";
import TodoList from "@/components/@pages/home/todo/TodoList";

export default function HomePage() {
  return (
    <>
      <Seo title="Todo App" />

      <Layout className=" px-0 lg:px-0">
        <TodoList />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  };
};
