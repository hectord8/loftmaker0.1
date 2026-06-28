import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";
import GalleryPreview from "@/Components/GalleryPreview";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";



const postsQuery = `*[_type in ["post", "posts", "content"]] | order(_createdAt desc)[0...8]{
  _id,
  title,
  "summary": coalesce(summary, excerpt, description, pt::text(body)),
  "slug": coalesce(slug.current, slug),
  "image": coalesce(coverImage, mainImage, image)
}`;
export const revalidate = 60; 
export default async function Home() {
  
  const posts = await sanityClient.fetch(postsQuery);

  return (
    <div className={styles.page}>
      <Hero />
      <section className={styles.intro} aria-labelledby="intro-heading">
        <h2 id="intro-heading">Complex Problems, innovative solutions</h2>
        <p>
          From start to finish, we make sure your home renovation London project
          delivers what you need. We do loft conversions, extensions, and full
          home renovations across London and Essex — from Chingford to South
          Woodford. Every job gets the same straightforward approach: clear
          pricing, honest timelines, and work we&apos;re happy to stand behind.
          Whether it&apos;s a simple conversion or something more involved, we&apos;ll
          talk through your options and find what works for your home and your
          budget.
        </p>
        <h3>Get in touch for a free, no-obligation consultation.</h3>
      </section>
      <PreviousProjectsSection />
      
      <Services />
      <GalleryPreview />
      {posts.length > 0 ? (
        <section className={styles.postsSection} aria-labelledby="posts-heading">
          <div className={styles.postsHeader}>
            <h2 id="posts-heading">Latest Posts</h2>
            <p>Updates from recent projects and work in progress.</p>
          </div>
          <ul className={styles.postsList}>
            {posts.map((post) => (
              <li key={post._id} className={styles.postCard}>
                <Link
                  className={styles.postLink}
                  href={post.slug ? `/posts/${post.slug.replace(/^\/+/, "")}` : "#"}
                >
                  {post.image ? (
                    <img
                      className={styles.postImage}
                      src={urlFor(post.image).width(720).height(480).fit("crop").url()}
                      alt={post.title || "Post image"}
                      loading="lazy"
                    />
                  ) : null}
                  <h3>{post.title || "Untitled"}</h3>
                  {post.summary ? (
                    <p className={styles.postSummary}>{post.summary}</p>
                  ) : null}
                  {post.slug ? <span>More Information -</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
    
  );
}
