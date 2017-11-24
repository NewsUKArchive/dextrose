import log from "./logger";

// export default async(dextrose, snapPath, teardown) => {
//   try {
//     const componentsLoaded = await dextrose.client.getLoadedComponents();

//     log.info('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)

//     for (let i = 0; i < componentsLoaded.length; i++) {
//       await dextrose.client.loadComponent(componentsLoaded[i]);
//       await dextrose.snapper.snap(`${snapPath}/${componentsLoaded[i]}`)

//       log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`)
//     }
//   } catch (err) {

//     throw new Error(err)
//   } finally {

//     teardown();
//   }
// }

export default (dextrose, snapPath, teardown) =>
new Promise(async (resolve, reject) => {
  const componentsLoaded = await dextrose.client.getLoadedComponents()
  log.info('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)

  for (let i = 0; i < componentsLoaded.length; i++) {
    await dextrose.client.loadComponent(componentsLoaded[i])
      .then(() => dextrose.snapper.snap(`${snapPath}/${componentsLoaded[i]}`))
      .catch( async (err) => {
        await teardown();
        reject(err);
      })
  }

  await teardown();
  resolve();
})