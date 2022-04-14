import { gql, useQuery } from '@apollo/client';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useGetProductsQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
  useMe,
} from '../../graphql/generated/page';
import { withApollo } from '../../lib/withApollo';

const Home: NextPage = () => {
  const { user } = useUser();
  // const { data, loading, error } = useGetProductsQuery();
  const { data } = useMe();
  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify({ user, data }, null, 2)}</pre>
    </div>
  );
};
export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
