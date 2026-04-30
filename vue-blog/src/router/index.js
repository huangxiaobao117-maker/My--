import { createRouter, createWebHistory } from "vue-router";

// 路由组件懒加载配置
const Home = () => import("../pages/Home.vue");
const Articles = () => import("../pages/Articles.vue");
const ArticleDetail = () => import("../pages/ArticleDetail.vue");
const About = () => import("../pages/About.vue");
const Profile = () => import("../pages/Profile.vue");
const Projects = () => import("../pages/Projects.vue");
const Privacy = () => import("../pages/Privacy.vue");
const Terms = () => import("../pages/Terms.vue");
const Contact = () => import("../pages/Contact.vue");
const Sitemap = () => import("../pages/Sitemap.vue");
const Cookie = () => import("../pages/Cookie.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/articles", name: "Articles", component: Articles },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/article/:id", name: "ArticleDetail", component: ArticleDetail },
  { path: "/about", name: "About", component: About },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/privacy", name: "Privacy", component: Privacy },
  { path: "/terms", name: "Terms", component: Terms },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/sitemap", name: "Sitemap", component: Sitemap },
  { path: "/cookie", name: "Cookie", component: Cookie },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
