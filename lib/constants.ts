export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBishalN%2FThreadgenie&env=OPENAI_API_KEY,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN&project-name=threadgenie&repository-name=threadgenie&demo-title=The%20Ultimate%20Tool%20for%20Crafting%20Twitter%20Threads&demo-description=Effortlessly%20Create%20Engaging%20and%20Informative%20Threads%20in%20Minutes&demo-url=https%3A%2F%2Fthreadgenie.vercel.app%2F";
