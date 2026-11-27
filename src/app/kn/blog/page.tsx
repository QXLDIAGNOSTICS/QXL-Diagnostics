import { permanentRedirect } from "next/navigation";

/** The pillar guide is the Kannada blog index. */
export default function KnBlogIndex() {
  permanentRedirect("/kn/blog/laboratory-tests-guide");
}
