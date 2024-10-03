const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf("7065406151:AAFo7-n93PPcGIId2Jn2Gg_xc08Li8gOcho");

const { initializeApp } = require("firebase/app");
const {
  getFireStore,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
} = require("firebase/firestore");

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVFuJ85d22p9zbVs28FXonl5f6L28J30k",
  authDomain: "forex-data-4dab7.firebaseapp.com",
  projectId: "forex-data-4dab7",
  storageBucket: "forex-data-4dab7.appspot.com",
  messagingSenderId: "1009559040852",
  appId: "1:1009559040852:web:fddc5e499306d0d4134ec1",
  measurementId: "G-WBZHY9DX86",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const newUser = async (id, payload) => {
  try {
    const docRef = await setDoc(doc(db, "users", `${id}`), {
      id: id,
      inviter: payload ? payload : null,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
const getUserData = async (userId, payload) => {
  try {
    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("user");
    } else {
      newUser(userId, payload);
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

const getAllUsers = async () => {
  const usersCollection = collection(db, "users"); // 'users' Firestore kolleksiyasi
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  console.log(usersList);

  return usersList;
};

bot.start(async (ctx) => {
  getUserData(ctx.chat.id, ctx.payload);

  const member = await ctx.telegram
    .getChatMember(`-1002232096294`, ctx.from.id)
    .then((s) => s.status)
    .catch((e) => console.log(e));

  const member1 = await ctx.telegram
    .getChatMember(`-1002341850667`, ctx.from.id)
    .then((s) => s.status)
    .catch((e) => console.log(e));

  const isMemberFunc = () => {
    if (member == "creator" || member == "member") {
      if (member1 == "creator" || member1 == "member") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const resultMember = isMemberFunc();
  if (resultMember) {
    try {
      ctx.telegram.sendAnimation(
        ctx.from.id,

        "https://t.me/mirzohid_odilov/33",

        {
          parse_mode: "HTML",
          caption: `<b>Hurmatli foydalanuvchi ushbu botdan to'liq foydalana olasiz.

O'zingizga kerakli darsliklarni olishingiz mumkin 👇 </b>       `,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Razgon strategiyalar darsligi 🚀",
                  callback_data: "razgon",
                },
              ],
              [
                {
                  text: "Yangiliklarda ishlash darsligi 🌐",
                  callback_data: "news",
                },
              ],
              [
                {
                  text: "Oz pul bilan ko'proq foyda olish strategiyasi 🔥",
                  callback_data: "ozpul",
                },
              ],
              [
                {
                  text: "0 dan boshlaganlar uchun darsliklar 📈",
                  callback_data: "0dan",
                },
              ],
            ],
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      ctx.telegram.sendMessage(
        ctx.from.id,
        "Iltimos botdan foydalanish uchun ushbu kanallarga obuna bo'ling",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "1-Kanal", url: "https://t.me/+RpD8RUg8UZU0Yzgy" }],
              [{ text: "2-Kanal", url: "https://t.me/+nzgTY1NJhdxjYmQ6" }],
            ],
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
});
bot.on("callback_query", (ctx) => {
  const dataCallback = ctx.callbackQuery.data;
  if (dataCallback == "0dan") {
    try {
      ctx.reply(
        `0 dan boshlash uchun barcha bepul darsliklar ushbu kanalda 👇
https://t.me/+lRxDrOIa7Fk1ZWVi`
      );
    } catch (e) {
      console.log(e);
    }
  } else if (dataCallback == "razgon") {
    try {
      ctx.reply(
        `Razgon strategiyalar ushbu kanalda va har hafta razgon qilinadi 
        
https://t.me/+rmAi2iO97a44N2Uy`
      );
    } catch (e) {
      console.log(e);
    }
  } else if (dataCallback == "news") {
    try {
      ctx.reply(`Newsda ishlash strategiyalari ushbu kanalda 👇
https://t.me/+mdE5L8vd465hN2My`);
    } catch (e) {
      console.log(e);
    }
  } else if (dataCallback == "ozpul") {
    try {
      ctx.reply(
        `Kam pul bilan ko'proq daromad olmoqchilar uchun strategiyalar 👇
https://t.me/+GHnfWo7zL_RhYzli`
      );
    } catch (e) {
      console.log(e);
    }
  }
});

// bot.command("hammaga", (ctx) => {
//   if (ctx.from.username == "oci_gramm") {
//     ctx.reply("Qanday Habar Yubormoqchisis").then((sentMessage) => {
//       const originalMessageId = sentMessage.message_id;

//       bot.on("text", async (cont) => {
//         if (
//           cont.message.reply_to_message &&
//           cont.message.reply_to_message.message_id === originalMessageId
//         ) {
//           const usersList = await getAllUsers();
//           console.log("done");

//           if (usersList) {
//             usersList.forEach((user) => {
//               console.log(user);

//               try {
//                 cont.telegram.sendMessage(cont.message, user.id, cont.chat.id);
//               } catch (e) {
//                 console.log(e);
//               }
//             });
//           }
//         }
//       });
//     });
//   }
// });
bot.launch();
