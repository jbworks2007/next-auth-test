import Link from "next/link";
import blogs from "../../utils/jsondata/blogdata.json";

export default function Page() {
  return (
    <div>
      {blogs.map((blog) => (
        <div className="">
          <Link href={{ pathname: `blogs/${blog.slug}`, query: blog }}>
            {blog.slug}
          </Link>
        </div>
      ))}
    </div>
  );
}
