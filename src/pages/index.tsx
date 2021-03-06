/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import {FiCalendar, FiUser} from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { useState } from 'react';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Home({postsPagination}: HomeProps) {

  const formattedPosts = postsPagination.results.map((post) => {
    return {
      ...post,
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd mm yyyy',
      {locale: ptBR}

    ),
    };
  });

  const [posts,setPosts] = useState<Post[]>(formattedPosts);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [currentPage, setCurrentPage] = useState(1); 

  async function handleNextPage(): Promise<void> {
    if(currentPage != 1 && nextPage === null) {
      return;
    }
    const postsResults = await fetch(`${nextPage}`).then(response => 
      response.json()
      );
      setNextPage(postsResults.next_page);
      setCurrentPage(postsResults.page);

      const newPosts = postsResults.results.map((post) => {
        return {
          uid: post.uid,
          first_publication_date: format(
            new Date(post.first_publication_date),
            'dd mm yyyy',
            {locale: ptBR}
      
          ),
          data: {
            title: post.data.title,
            subtitle: post.data.subtitle,
            author: post.data.author,
        },
      };
    });
    setPosts([...posts, ...newPosts]);
  }



  return (
    <>
    <Head>
      <title>Home | spacetraveling</title>
    </Head>
    <main className={commonStyles.container}>
      <Header />
      <div className={styles.posts}>
        {posts.map(post => (
          <Link href={`/post/${post.uid}`} key={post.uid}>
          <a className={styles.post}>
            <strong> {post.data.title}</strong>
            <p> {post.data.subtitle}</p>
          
          <ul>
            <li>
              <FiCalendar />
              {post.first_publication_date}
            </li>
            <li>
              <FiUser />
              {post.data.author}
            </li>
          </ul>
          </a>
        </Link>
        ))}
        {nextPage && (
          <button type="button">Carregar mais posts</button>
        )}
      </div>
    </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'nutri')],
    {
      pageSize: 1,
    }
  );
    const posts = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
      },
    };
    });

    const postsPagination = {
      next_page: postsResponse.next_page,
      results: posts,
    }

    return {
      props: {
        postsPagination,
      },
    };

  
};
