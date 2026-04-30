import { reactive, onMounted, watch } from "vue";

const defaultProfile = {
  name: "陈墨麟",
  avatar:
    "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=anime%20girl%20avatar%20portrait%20cute%20kawaii%20style%20purple%20hair%20big%20eyes%20pink%20bow%20white%20background&image_size=square",
  bio: "全栈开发者 | 极简主义设计爱好者 | 终身学习者",
  tags: [
    { label: "Vue 3 专家", bg: "bg-blue-50", color: "text-blue-500" },
    { label: "UI 设计", bg: "bg-pink-50", color: "text-pink-500" },
    { label: "数字游民", bg: "bg-purple-50", color: "text-purple-500" },
  ],
  followersCount: 1204, // 默认关注者数量
  totalReads: 42500, // 默认累计阅读数量
};

// 创建一个响应式对象，用于存储用户资料
// 这是一个全局共享的状态
const profile = reactive({ ...defaultProfile });

export function useProfile() {
  onMounted(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // 验证关键字段是否存在
        if (parsedProfile.name && parsedProfile.avatar && parsedProfile.bio) {
          // 合并旧数据和新的默认标签，确保新标签被添加
          if (
            !parsedProfile.tags ||
            parsedProfile.tags.length < defaultProfile.tags.length
          ) {
            parsedProfile.tags = defaultProfile.tags;
          }
          Object.assign(profile, parsedProfile);
        } else {
          // 如果数据不完整，使用默认值
          Object.assign(profile, defaultProfile);
          localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
        }
      } catch (e) {
        // 如果解析失败，使用默认值
        Object.assign(profile, defaultProfile);
        localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
      }
    } else {
      // 如果 localStorage 中没有，则保存默认资料
      localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
    }
  });

  // 监听 profile 对象的任何变化，并保存到 localStorage
  watch(
    profile,
    (newProfile) => {
      localStorage.setItem("user_profile", JSON.stringify(newProfile));
    },
    { deep: true },
  );

  // 更新 profile 的函数
  const updateProfile = (data) => {
    Object.assign(profile, data);
  };

  const updateFollowersCount = (count) => {
    profile.followersCount = count;
  };

  const updateTotalReads = (count) => {
    profile.totalReads = count;
  };

  return { profile, updateProfile, updateFollowersCount, updateTotalReads };
}
