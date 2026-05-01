/**
 * 博客后端 API 服务
 * 使用本地存储作为数据源，不依赖后端服务器
 */

// 使用本地存储模拟 API
const STORAGE_KEYS = {
  ARTICLES: "blog_articles",
  PROJECTS: "blog_projects",
  PROFILE: "user_profile",
  TOKEN: "token",
};

/**
 * 获取存储的数据
 */
function getStoredData(key, defaultValue = []) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

/**
 * 保存数据到存储
 */
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 文章相关 API
 */
export const articleApi = {
  // 获取文章列表
  getAll: () => Promise.resolve(getStoredData(STORAGE_KEYS.ARTICLES)),

  // 获取单篇文章
  getById: (id) => {
    const articles = getStoredData(STORAGE_KEYS.ARTICLES);
    const article = articles.find(
      (a) => a.id === id || articles.indexOf(a) === parseInt(id),
    );
    return Promise.resolve(article || null);
  },

  // 添加文章
  create: (article) => {
    const articles = getStoredData(STORAGE_KEYS.ARTICLES);
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    articles.unshift(newArticle);
    saveData(STORAGE_KEYS.ARTICLES, articles);
    return Promise.resolve(newArticle);
  },

  // 更新文章
  update: (id, article) => {
    const articles = getStoredData(STORAGE_KEYS.ARTICLES);
    const index = articles.findIndex(
      (a) => a.id === id || articles.indexOf(a) === parseInt(id),
    );
    if (index !== -1) {
      articles[index] = {
        ...articles[index],
        ...article,
        updatedAt: new Date().toISOString(),
      };
      saveData(STORAGE_KEYS.ARTICLES, articles);
    }
    return Promise.resolve(articles[index] || null);
  },

  // 删除文章
  delete: (id) => {
    const articles = getStoredData(STORAGE_KEYS.ARTICLES);
    const index = articles.findIndex(
      (a) => a.id === id || articles.indexOf(a) === parseInt(id),
    );
    if (index !== -1) {
      articles.splice(index, 1);
      saveData(STORAGE_KEYS.ARTICLES, articles);
    }
    return Promise.resolve({ message: "删除成功" });
  },
};

/**
 * 项目相关 API
 */
export const projectApi = {
  getAll: () => Promise.resolve(getStoredData(STORAGE_KEYS.PROJECTS)),

  getById: (id) => {
    const projects = getStoredData(STORAGE_KEYS.PROJECTS);
    const project = projects.find(
      (p) => p.id === id || projects.indexOf(p) === parseInt(id),
    );
    return Promise.resolve(project || null);
  },

  create: (project) => {
    const projects = getStoredData(STORAGE_KEYS.PROJECTS);
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    saveData(STORAGE_KEYS.PROJECTS, projects);
    return Promise.resolve(newProject);
  },

  update: (id, project) => {
    const projects = getStoredData(STORAGE_KEYS.PROJECTS);
    const index = projects.findIndex(
      (p) => p.id === id || projects.indexOf(p) === parseInt(id),
    );
    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...project,
        updatedAt: new Date().toISOString(),
      };
      saveData(STORAGE_KEYS.PROJECTS, projects);
    }
    return Promise.resolve(projects[index] || null);
  },

  delete: (id) => {
    const projects = getStoredData(STORAGE_KEYS.PROJECTS);
    const index = projects.findIndex(
      (p) => p.id === id || projects.indexOf(p) === parseInt(id),
    );
    if (index !== -1) {
      projects.splice(index, 1);
      saveData(STORAGE_KEYS.PROJECTS, projects);
    }
    return Promise.resolve({ message: "删除成功" });
  },
};

/**
 * 个人资料相关 API
 */
export const profileApi = {
  get: () => Promise.resolve(getStoredData(STORAGE_KEYS.PROFILE, {})),

  update: (profile) => {
    const current = getStoredData(STORAGE_KEYS.PROFILE, {});
    const updated = {
      ...current,
      ...profile,
      updatedAt: new Date().toISOString(),
    };
    saveData(STORAGE_KEYS.PROFILE, updated);
    return Promise.resolve(updated);
  },
};

/**
 * 认证相关 API
 */
export const authApi = {
  login: (credentials) => {
    // 简单的本地认证
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      const token = "local-token-" + Date.now();
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return Promise.resolve({ success: true, token });
    }
    return Promise.resolve({ success: false, message: "用户名或密码错误" });
  },

  verify: () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return Promise.resolve(
      token
        ? { success: true, user: { username: "admin" } }
        : { success: false },
    );
  },
};

export default {
  articleApi,
  projectApi,
  profileApi,
  authApi,
};
