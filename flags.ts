// flags.ts

import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";

import { flag, dedupe } from "flags/next";

import type { Identify } from "flags";



export const identify = dedupe((async () => ({

  // implement the identify() function to add any additional user properties you'd like, see docs.statsig.com/concepts/user

  userID: "1234" //for example, set userID

})) satisfies Identify<StatsigUser>);



export const createFeatureFlag = (key: string) => {
  // Check if Statsig is properly configured
  const statsigKey = process.env.STATSIG_SERVER_SECRET_KEY
  
  // If Statsig is not configured, return a flag that always returns false
  if (!statsigKey) {
    return () => Promise.resolve(false)
  }

  try {
    return flag<boolean, StatsigUser>({
      key,
      adapter: statsigAdapter.featureGate((gate) => gate.value, {exposureLogging: true}),
      identify,
    })
  } catch (error) {
    // If initialization fails, return a flag that always returns false
    console.warn(`Feature flag "${key}" initialization failed:`, error)
    return () => Promise.resolve(false)
  }
}




