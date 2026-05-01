import { reactive, onMounted, watch } from "vue";

const defaultProfile = {
  name: "黄小包",
  avatar:
    "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=anime%20girl%20avatar%20portrait%20cute%20kawaii%20style%20purple%20hair%20big%20eyes%20pink%20bow%20white%20background&image_size=square",
  bio: "全栈开发者 | 极简主义设计爱好者 | 终身学习者",
  tags: [
    { label: "Vue 3 专家", bg: "bg-blue-50", color: "text-blue-500" },
    { label: "UI 设计", bg: "bg-pink-50", color: "text-pink-500" },
    { label: "数字游民", bg: "bg-purple-50", color: "text-purple-500" },
  ],
  followersCount: 1204,
  totalReads: 42500,
};

const profile = reactive({ ...defaultProfile });

export function useProfile() {
  onMounted(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.name && parsedProfile.avatar && parsedProfile.bio) {
          if (
            !parsedProfile.tags ||
            parsedProfile.tags.length < defaultProfile.tags.length
          ) {
            parsedProfile.tags = defaultProfile.tags;
          }
          Object.assign(profile, parsedProfile);
        } else {
          Object.assign(profile, defaultProfile);
          localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
        }
      } catch (e) {
        Object.assign(profile, defaultProfile);
        localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
      }
    } else {
      localStorage.setItem("user_profile", JSON.stringify(defaultProfile));
    }
  });

  watch(
    profile,
    (newProfile) => {
      localStorage.setItem("user_profile", JSON.stringify(newProfile));
    },
    { deep: true },
  );

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
