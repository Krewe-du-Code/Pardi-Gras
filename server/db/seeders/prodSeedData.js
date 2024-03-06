/** @type {import{'sequelize-cli'}.Migration} */
// This is exactly the same as devSeedData.js rn

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        email: "a@b.com",
        phone: "123-456-7890",
        firstName: "Bob",
        lastName: "Johnson",
        latitude: 29.963864,
        longitude: -90.05213,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "c@d.com",
        phone: "223-456-7890",
        firstName: "John",
        lastName: "Smith",
        latitude: 29.974952,
        longitude: -90.052869,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "e@f.com",
        phone: "323-456-7890",
        firstName: "Erik",
        lastName: "Andrews",
        latitude: 29.971376,
        longitude: -90.056863,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "g@h.com",
        phone: "323-426-7890",
        firstName: "Sara",
        lastName: "Hills",
        latitude: 29.971336,
        longitude: -90.056263,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "i@j.com",
        phone: "313-426-7390",
        firstName: "Katie",
        lastName: "Madison",
        latitude: 29.969472,
        longitude: -90.075761,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "j@k.com",
        phone: "323-426-7890",
        firstName: "Donna",
        lastName: "Parsons",
        latitude: 29.964229,
        longitude: -90.040224,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
      {
        email: "y@g.com",
        phone: "231-649-2298",
        firstName: "Devan",
        lastName: "Gary",
        latitude: 29.968048,
        longitude: -90.051059,
        createdAt: new Date(),
        updatedAt: new Date(),
        shareLoc: true,
      },
    ]);

    await queryInterface.bulkInsert("events", [
      {
        name: "Meetup at the Friendly Bar",
        startTime: "2024-02-18T18:00",
        endTime: "2024-02-18T19:00",
        description: "Grabbing a pint for old time's sake",
        longitude: -90.05951,
        latitude: 29.963724,
        address: "2301 Chartes St., New Orleans LA 70117",
        link: null,
        system: false,
        attendingCount: 2,
        invitedCount: 2,
        upvotes: 0,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl:
          "https://www.shutterstock.com/shutterstock/photos/1930257152/display_1500/stock-photo-seven-horses-force-running-out-1930257152.jpg",
      },
      {
        name: "DJ set at PvF Marker",
        startTime: "2023-12-24T21:00",
        endTime: "2023-12-24T22:00",
        description: "Hot tracks by the tracks",
        longitude: -90.048717,
        latitude: 29.964642,
        address: null,
        link: null,
        system: false,
        attendingCount: 3,
        invitedCount: 1,
        upvotes: 0,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boil",
        startTime: "2023-12-24T14:00",
        endTime: "2023-12-24T15:00",
        description: "Parade pregame",
        longitude: -90.052452,
        latitude: 29.964846,
        address: null,
        link: null,
        system: false,
        attendingCount: 3,
        invitedCount: 0,
        upvotes: 0,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Garage Sale",
        startTime: "2024-01-24T14:00",
        endTime: "2024-01-24T15:00",
        description: "Help me find gifts for my Aunt Patty.",
        longitude: -90.052452,
        latitude: 29.964846,
        address: null,
        link: null,
        system: false,
        attendingCount: 0,
        invitedCount: 1,
        upvotes: 0,
        ownerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_user_events", [
      {
        eventId: 1,
        userId: 1,
        senderId: 2,
        isAttending: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        userId: 1,
        senderId: 2,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        userId: 2,
        senderId: 2,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        userId: 1,
        senderId: 2,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 2,
        userId: 3,
        senderId: 2,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        userId: 1,
        senderId: 3,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        userId: 2,
        senderId: 3,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        userId: 3,
        senderId: 3,
        isAttending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 1,
        userId: 3,
        senderId: 1,
        isAttending: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 1,
        userId: 7,
        senderId: 1,
        isAttending: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 4,
        userId: 7,
        senderId: 6,
        isAttending: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("pins", [
      {
        // free toilet
        longitude: -90.053271,
        latitude: 29.962828,
        isToilet: false,
        isFood: false,
        isPersonal: false,
        isFree: true,
        isPhoneCharger: false,
        isPoliceStation: false,
        isEMTStation: false,
        upvotes: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // $3 toilent
        longitude: -90.051899,
        latitude: 29.963333,
        isToilet: true,
        isFood: false,
        isPersonal: false,
        isFree: false,
        isPhoneCharger: false,
        isPoliceStation: false,
        isEMTStation: false,
        upvotes: 0,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // # 3, food
        longitude: -90.050777,
        latitude: 29.9636,
        isToilet: false,
        isFood: true,
        isPersonal: false,
        isFree: false,
        isPhoneCharger: false,
        isPoliceStation: false,
        isEMTStation: false,
        upvotes: 0,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // # 4, personal
        longitude: -90.056035,
        latitude: 29.961779,
        isToilet: false,
        isFood: false,
        isPersonal: true,
        isFree: false,
        isPhoneCharger: false,
        isPoliceStation: false,
        isEMTStation: false,
        upvotes: 0,
        ownerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // # 5, emt
        longitude: -90.05671,
        latitude: 29.965501,
        isToilet: false,
        isFood: false,
        isPersonal: false,
        isFree: false,
        isPhoneCharger: false,
        isPoliceStation: false,
        isEMTStation: true,
        upvotes: 0,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // # 6, phone charger
        longitude: -90.05198,
        latitude: 29.966916,
        isToilet: false,
        isFood: false,
        isPersonal: false,
        isFree: false,
        isPhoneCharger: true,
        isPoliceStation: false,
        isEMTStation: false,
        upvotes: 0,
        ownerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // # 7, police
        longitude: -90.056241,
        latitude: 29.963603,
        isToilet: false,
        isFood: false,
        isPersonal: false,
        isFree: false,
        isPhoneCharger: false,
        isPoliceStation: true,
        isEMTStation: false,
        upvotes: 0,
        ownerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_pin_votes", [
      {
        isUpvoted: true,
        voter_userId: 2,
        pinId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 1,
        pinId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 3,
        pinId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("photos", [
      {
        // 1
        longitude: -90.053271,
        latitude: 29.962828,
        description: "A free toilet!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/yfpo9qrachrpizrgkt47.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 2
        longitude: -90.051899,
        latitude: 29.963333,
        description: "$3 dollars per use! Nice and clean!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/ebsvvw2yy75mgdszogzl.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 0,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 3
        longitude: -90.050777,
        latitude: 29.9636,
        description: "Hot sausage in da house. $10 ftw!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/ktpl4konvtsxeuy3mgi8.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 0,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 4
        longitude: -90.050777,
        latitude: 29.9636,
        description: "Not so fast! Now a long line for po boys!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/z84caqng7omrheoqksrw.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 5
        longitude: -90.056035,
        latitude: 29.961779,
        description: "Left bike here!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/yrzmn9ssn6ysrnripdue.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 0,
        ownerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 6
        longitude: -90.055109,
        latitude: 29.963299,
        description: "Check out my costume",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/ndhf9ymjk2dmilprjgst.jpg",
        isCostume: true,
        isThrow: false,
        isPin: false,
        upvotes: 1,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 7
        longitude: -90.055132,
        latitude: 29.963645,
        description: "Space vikings skol!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/ucpmdxbhujyrqzpjxml2.jpg",
        isCostume: true,
        isThrow: false,
        isPin: false,
        upvotes: 1,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 8
        longitude: -90.055155,
        latitude: 29.963277,
        description: "Oh yeah! Thank you, Muses",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/krwwlsqiiwlu8ujyt8zk.jpg",
        isCostume: false,
        isThrow: true,
        isPin: false,
        upvotes: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 9
        longitude: -90.055144,
        latitude: 29.963244,
        description: "Check out what I got at Zulu!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/z4ips6rseyeyydt0zgix.jpg",
        isCostume: false,
        isThrow: true,
        isPin: false,
        upvotes: 3,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 10
        longitude: -90.055432,
        latitude: 29.963234,
        description: "All hail Doctor Oz!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/petewb3zjwanwibxffsk.jpg",
        isCostume: false,
        isThrow: false,
        isPin: false,
        upvotes: 5,
        ownerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 11
        longitude: -90.051234,
        latitude: 29.963765,
        description: "Motley Crew in the FQ",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/wkkc6ixqekszbjbolslu.jpg",
        isCostume: true,
        isThrow: false,
        isPin: false,
        upvotes: 3,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 12
        longitude: -90.051234,
        latitude: 29.963765,
        description: "Uggh more beaadddszzz 😭 Wahhh",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/t9fdgexvifjlzqpbcaa7.jpg",
        isCostume: false,
        isThrow: true,
        isPin: false,
        upvotes: -4,
        ownerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 13
        longitude: -90.051334,
        latitude: 29.963165,
        description: "🥁 Drumline woooo!",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/r2dlbdsnrc6tj5a1r7ax.jpg",
        isCostume: false,
        isThrow: false,
        isPin: false,
        upvotes: 7,
        ownerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 14
        longitude: -90.05671,
        latitude: 29.965501,
        description: "Emt if you need a helping hand",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/oh8ugtya4ykz6d0ysl32.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 7,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 15
        longitude: -90.05198,
        latitude: 29.966916,
        description: "Phone charger if ur outta juice",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/dubvno2a2fr1ncbzeazk.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 3,
        ownerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 16
        longitude: -90.056241,
        latitude: 29.963603,
        description: "Hot fuzz, 6 o'clock (that means they're behind you).",
        photoURL:
          "https://res.cloudinary.com/dj5uxv8tg/image/upload/v1706028911/Carnivale/u3vgjan0n7ufckqbh7tt.jpg",
        isCostume: false,
        isThrow: false,
        isPin: true,
        upvotes: 2,
        ownerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_photo_votes", [
      {
        isUpvoted: true,
        voter_userId: 2,
        photoId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 1,
        photoId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 2,
        photoId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 3,
        photoId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 2,
        photoId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 3,
        photoId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 4,
        photoId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 5,
        photoId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_pin_photos", [
      {
        //1
        photoId: 1,
        pinId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //2
        photoId: 2,
        pinId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //3
        photoId: 3,
        pinId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //4
        photoId: 4,
        pinId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //5
        photoId: 5,
        pinId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //6
        photoId: 14,
        pinId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //7
        photoId: 15,
        pinId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //7
        photoId: 16,
        pinId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("comments", [
      {
        comment:
          "Cannot wait to see the satire at KdV, hope the weather holds up ⚡",
        upvotes: 2,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment:
          "🔥Police razor scooter is on fire!🔥 Passersby putting it out with their drinks!",
        upvotes: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment:
          "Was that Morgus the Magnificent in a costume at Chewbacchus??? 🦦",
        upvotes: 1,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment:
          "🫣 I think I just saw that guy from the Bachelorette outside R bar...",
        upvotes: 3,
        ownerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: "The sun is shining, and I'm already peeling like an 🍊",
        upvotes: 1,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: "Where should I get some food? Somebody drop a good pin!",
        upvotes: 0,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment:
          "🆘! Anybody got a bathroom by Royal & Spain? Drop a pin already 📍📍📍",
        upvotes: 5,
        ownerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: "Where can I buy a ticket to Mardi Gras?",
        upvotes: -4,
        ownerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_comment_votes", [
      {
        isUpvoted: true, // true is upvote, false is downvote
        voter_userId: 1,
        commentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 2,
        commentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 1,
        commentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 2,
        commentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: true,
        voter_userId: 1,
        commentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 3,
        commentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 2,
        commentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 3,
        commentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 4,
        commentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        isUpvoted: false,
        voter_userId: 5,
        commentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_friends", [
      {
        requester_userId: 5,
        recipient_userId: 7,
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 6,
        recipient_userId: 7,
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 4,
        recipient_userId: 7,
        isConfirmed: true, // null indicates the request is pending (may need to change this if null can't be fetched)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 2,
        recipient_userId: 7,
        isConfirmed: null, // open request
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 1,
        recipient_userId: 2,
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 1,
        recipient_userId: 3,
        isConfirmed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        requester_userId: 1,
        recipient_userId: 6,
        isConfirmed: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("join_shared_posts", [
      {
        sender_userId: 2,
        recipient_userId: 1,
        shared_commentId: null,
        shared_pinId: null,
        shared_photoId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sender_userId: 5,
        recipient_userId: 1,
        shared_commentId: 3,
        shared_pinId: null,
        shared_photoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sender_userId: 6,
        recipient_userId: 1,
        shared_commentId: 8,
        shared_pinId: null,
        shared_photoId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("");
  },
};