import TitleSlide from "./01-Title";
// import IntroductionSlide from "./02-Introduction";
import TrainingGoalsSlide from "./03-TrainingGoals";
import WhatWeAreBuildingSlide from "./04-WhatWeAreBuilding";
import WhatAreWorkersSlide from "./05-WhatAreWorkers";
import WorkerAnatomySlide from "./06-WorkerAnatomy";
import PrerequisitesSlide from "./07-Prerequisites";
import Step1GettingStartedSlide from "./08-Step1GettingStarted";
import ProjectStructureSlide from "./09-ProjectStructure";
import Step2HttpHandlingSlide from "./10-Step2HttpHandling";
import CrudHandlersSlide from "./11-CrudHandlers";
import TestingStep2Slide from "./12-TestingStep2";
import WhatIsKVSlide from "./13-WhatIsKV";
import Step3KVSetupSlide from "./14-Step3KVSetup";
import KVFullCodeSlide from "./14b-KVFullCode";
import Step4D1IntroSlide from "./15-Step4D1Intro";
import D1SetupSlide from "./16-D1Setup";
import CacheAsidePatternSlide from "./17-CacheAsidePattern";
import D1FullCodeSlide from "./17b-D1FullCode";
import Step5WorkersAISlide from "./18-Step5WorkersAI";
import Step6AIGatewaySlide from "./19-Step6AIGateway";
import Step7DeploySlide from "./20-Step7Deploy";
import PlatformOverviewSlide from "./21-PlatformOverview";
import RecapSlide from "./22-Recap";
import NextStepsSlide from "./23-NextSteps";
import ThankYouSlide from "./24-ThankYou";

export const slides = [
  { id: "title", component: TitleSlide },
  // { id: "introduction", component: IntroductionSlide },
  { id: "training-goals", component: TrainingGoalsSlide },
  { id: "what-we-are-building", component: WhatWeAreBuildingSlide },
  { id: "what-are-workers", component: WhatAreWorkersSlide },
  { id: "worker-anatomy", component: WorkerAnatomySlide },
  { id: "prerequisites", component: PrerequisitesSlide },
  { id: "step-1-getting-started", component: Step1GettingStartedSlide },
  { id: "project-structure", component: ProjectStructureSlide },
  { id: "step-2-http-handling", component: Step2HttpHandlingSlide },
  { id: "crud-handlers", component: CrudHandlersSlide },
  { id: "testing-step-2", component: TestingStep2Slide },
  { id: "what-is-kv", component: WhatIsKVSlide },
  { id: "step-3-kv-setup", component: Step3KVSetupSlide },
  { id: "step-3-full-code", component: KVFullCodeSlide },
  { id: "step-4-d1-intro", component: Step4D1IntroSlide },
  { id: "d1-setup", component: D1SetupSlide },
  { id: "cache-aside-pattern", component: CacheAsidePatternSlide },
  { id: "step-4-full-code", component: D1FullCodeSlide },
  { id: "step-5-workers-ai", component: Step5WorkersAISlide },
  { id: "step-6-ai-gateway", component: Step6AIGatewaySlide },
  { id: "step-7-deploy", component: Step7DeploySlide },
  { id: "platform-overview", component: PlatformOverviewSlide },
  { id: "recap", component: RecapSlide },
  { id: "next-steps", component: NextStepsSlide },
  { id: "thank-you", component: ThankYouSlide },
];
