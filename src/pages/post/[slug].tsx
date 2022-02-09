/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: PostProps) {
  return (
    <>
    <Header />
    <img src="/Banner.png" alt="Banner" className={styles.banner} />
    <main className={commonStyles.container}>
      <div className={styles.post}>
        <div className={styles.postTop}>
          <h1> Titulo Exemplo</h1>
          <ul>
            <li>
              <FiCalendar />
              01 abr 2022
            </li>
            <li>
              <FiUser />
              Bernardo Caldas
            </li>
            <li>
            <FiClock /> 5 min
            </li>
          </ul>

        </div>
        <article>
          <h2> Titulo Seção </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum laudantium necessitatibus, ullam fuga, veritatis suscipit minima quam rem quo voluptas sed ratione quos molestiae corporis. Vitae, voluptate. Unde cupiditate voluptate explicabo nulla, consequatur, dolor impedit aperiam neque ipsa dicta voluptas culpa consectetur itaque necessitatibus tempore blanditiis. Quos, ad recusandae voluptates vero tenetur obcaecati labore cum. Similique sequi debitis hic tenetur rerum dolore sunt, illo quas dicta, possimus dignissimos. Debitis, minus!</p>
        </article>
      </div>

    </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
