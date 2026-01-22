import path from "path";

export function createPlitkaCard() {
  return {
    img: "examples/plitka.jpg",
    title: "Тротуарная плитка",
    price: 580,
    description:
      "Производим тротуарную плитку: кирпич, старый город, катушка, сота. Толщина 25 мм, 40 мм, 60 мм. Цвета: серый, коричневый, красный, чёрный, оливковый, белый, жёлтый, оранжевый.",
    types: [
      { value: "old-town", text: "Старый город" },
      { value: "coil", text: "Катушка" },
      { value: "sota", text: "Сота" },
    ],
    sizes: [
      { value: "25mm", text: "25мм" },
      { value: "40mm", text: "40мм" },
      { value: "60mm", text: "60мм" },
    ],
    colors: [
      { value: "black", text: "Чёрный" },
      { value: "gray", text: "Серый" },
      { value: "white", text: "Белый" },
      { value: "brown", text: "Коричневый" },
      { value: "red", text: "Красный" },
      { value: "yellow", text: "Жёлтый" },
      { value: "orange", text: "Оранжевый" },
      { value: "olive", text: "Оливковый" },
    ],
  };
}
export function createSpheresCard() {
  return {
    img: "examples/polySpheres.jpg",
    title: "Бетонные полусферы",
    price: 850,
    description:
      "Производим бетонные полусферы диаметром 480 мм, высотой 250 мм, вес 65 кг.",
  };
}
export function createPorebrikCard() {
  return {
    img: "examples/porebrik.jpg",
    title: "Поребрик",
    price: 120,
    colors: [
      { value: "gray", text: "Серый" },
      { value: "brown", text: "Коричневый" },
      { value: "red", text: "Красный" },
    ],
    description:
      "Производим поребрики 470х60х200 мм, серого, красного и коричневого цветов.",
  };
}
export function createBorduresCard() {
  return {
    img: "examples/bordures.jpg",
    title: "Дорожные бордюры",
    price: 500,
    description: "Производим и устанавливаем дорожные бордюры.",
  };
}
export function createFbsCard() {
  return {
    img: "examples/blocks.jpg",
    title: "Блоки ФБС",
    price: 2800,
    description:
      "Производим блоки ФБС 24.3.6, 24.4.6, половинки, а также можем изготовить блоки под индивидуальный размер",
  };
}
export function createRoundesCard() {
  return {
    img: "examples/roundes.jpg",
    title: "Бетонные кольца и крышки",
    price: 3350,
    sizes: [
      { value: "1m", text: "Диаметр 1м" },
      { value: "1.5m", text: "Диаметр 1.5м" },
    ],
    description:
      "Производим бетонные кольца диаметром 1 и 1,5 метра, высотой 0,3, 0,6, 0,9 и 1 метр. Так же делаем крышки и днища к ним",
  };
}
export function createAdmin() {
  return {
    name: "Сергей",
    password: "5342312",
    tel: "+7(978) 756-14-24",
  };
}
