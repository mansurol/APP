import notifee from "@notifee/react-native";

async function onMessageReceived(message) {
  const { data } = message;

  const notifeeData = JSON.parse(data.notifee);

  await notifee.createChannel({
    id: "notifications",
    name: "Order Status",
    lights: true,
  });

  await notifee.displayNotification({
    title: notifeeData.title,
    body: notifeeData.body,

    android: {
      channelId: "notifications",
      pressAction: {
        id: "default",
        launchActivity: "com.easyresultbd.app.MainActivity",
      },
    },
    data: notifeeData?.data, // data to send to onNotificationOpenedApp
  });
}

export default onMessageReceived;
