import { reactive, onMounted, watch } from 'vue';

const ACTIVITY_STORAGE_KEY = 'user_activities';
const MAX_ACTIVITIES = 10; // 限制活动列表的最大数量

const defaultActivities = [
  {
    type: "publish_article",
    title: "发布了新文章",
    details: "关于 Vue 3.4 新特性",
    timestamp: Date.now() - 3600000 * 2, // 2小时前
    dotColor: "bg-blue-500",
  },
  {
    type: "received_comment",
    title: "收到了新回复",
    details: "来自 @设计狮王",
    timestamp: Date.now() - 3600000 * 5, // 5小时前
    dotColor: "bg-pink-500",
  },
];

const activities = reactive([]);

const saveActivitiesToLocalStorage = () => {
  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
};

export function useActivities() {
  onMounted(() => {
    const savedActivities = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (savedActivities) {
      Object.assign(activities, JSON.parse(savedActivities));
    } else {
      Object.assign(activities, defaultActivities);
      saveActivitiesToLocalStorage(); // 保存默认活动
    }
  });

  watch(
    activities,
    () => {
      saveActivitiesToLocalStorage();
    },
    { deep: true }
  );

  const addActivity = (activity) => {
    activities.unshift({ ...activity, timestamp: Date.now() }); // 新活动添加到最前面并记录时间戳
    if (activities.length > MAX_ACTIVITIES) {
      activities.pop(); // 保持活动列表在最大数量内
    }
  };

  return { activities, addActivity };
}
