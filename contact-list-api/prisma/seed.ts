import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  /* const user1 = await prisma.user.create({
    data: {
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phoneNumber: '770-736-8031',
      address: {
        create: {
          country: 'United Kingdom',
          city: 'Gwenborough',
          street: 'Kulas Light',
          zipcode: '92998-3874',
        },
      },
    },    
  }); */

  await prisma.user.create({
    data: {
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phoneNumber: '770-777-8031',
      address: {
        create: {
          country: 'United States',
          city: 'Wisokyburgh',
          street: 'Victor Plains',
          zipcode: '90566-7771',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phoneNumber: '770-666-8031',
      address: {
        create: {
          country: 'United States',
          city: 'McKenziehaven',
          street: 'Douglas Extension',
          zipcode: '59590-4157',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Patricia Lebsack',
      email: 'julianne.OConner@kory.org',
      phoneNumber: '170-999-8080',
      address: {
        create: {
          country: 'Guatemala',
          city: 'South Elvis',
          street: 'Hoeger Mall',
          zipcode: '53919-4257',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Chelsey Dietrich',
      email: 'lucio_Hettinger@annie.ca',
      phoneNumber: '557-935-8478',
      address: {
        create: {
          country: 'Guatemala',
          city: 'Roscoeview',
          street: 'Skiles Walks',
          zipcode: '59560-4157',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Dennis Schulist',
      email: 'karley_Dach@jasper.info',
      phoneNumber: '477-935-8478',
      address: {
        create: {
          country: 'United States',
          city: 'South Christy',
          street: 'Norberto Crossing',
          zipcode: '23505-1337',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Kurtis Weissnat',
      email: 'telly.Hoeger@billy.biz',
      phoneNumber: '210-067-6132',
      address: {
        create: {
          country: 'United States',
          city: 'Howemouth',
          street: 'Rex Trail',
          zipcode: '58804-1099',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Glenna Reichert',
      email: 'chaim_McDermott@dana.io',
      phoneNumber: '775-976-6794',
      address: {
        create: {
          country: 'Canada',
          city: 'Bartholomebury',
          street: 'Dayna Park',
          zipcode: '76495-3109',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Nicholas Runolfsdottir V',
      email: 'sherwood@rosamond.me',
      phoneNumber: '586-493-6943',
      address: {
        create: {
          country: 'Canada',
          city: 'Aliyaview',
          street: 'Ellsworth Summit',
          zipcode: '45169-2020',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Clementina DuBuque',
      email: 'rey.Padberg@karina.biz',
      phoneNumber: '024-648-3804',
      address: {
        create: {
          country: 'New Zeland',
          city: 'Lebsackbury',
          street: 'Kattie Turnpike',
          zipcode: '31428-2261',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phoneNumber: '025-648-3804',
      address: {
        create: {
          country: 'United States',
          city: 'New Jersey',
          street: 'Curly Hill Rd',
          zipcode: '31428-2266',
        },
      },
    },    
  });

  await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phoneNumber: '025-645-3456',
      address: {
        create: {
          country: 'United States',
          city: 'New Jersey',
          street: 'King Ave',
          zipcode: '31428-2377',
        },
      },
    },    
  });

  // console.log(user1);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
