import { useEffect, useRef, useState } from "react";
import Image from "next/image"

const content = [
  {
    title: "Архитектурное проектирование",
    description:
      "Предлагаем услуги по архитектурному проектированию частных объектов, \n" +
      "также доработку существующих фасадов \n" +
      "и строений с целью улучшить их внешний вид и характеристики. Индивидуальный подход и внимательное отношение \n" +
      "к пожеланиям клиента – залог нашей успешной работы.",
  },
  {
    title: "Дизайн интерьера\n",
    description:
      "Дизайн интерьера  отражает вкус, \n" +
      "статус и внутренний мир  его обитателя. \n" +
      "Мы реализуем  проекты для частных \n" +
      "и общественных заведений любой сложности и стиля . ",
  },
  {
    title: "Комплектация проектов",
    description:
      "В выставочном зале при нашем дизайн-бюро можно посмотреть некоторые образцы мебели от лучших европейских производителей, выбрать по каталогам товары более 400 производителей мебели, сантехники, светильников, отделочных материалов, мозаики, аксессуаров и текстиля. ",
  },
];

export default function Home() {
  const firstItemRef = useRef<HTMLDivElement>(null);
  const secondItemRef = useRef<HTMLDivElement>(null);
  const thirdItemRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNextBtn = () => {
    const firstElement = firstItemRef.current;
    const secondElement = secondItemRef.current;
    const thirdElement = thirdItemRef.current;

    if (firstElement && secondElement && thirdElement) {
      if (firstElement.classList.contains("first-item")) {
        firstElement.classList.replace("first-item", "third-item");
        secondElement.classList.replace("second-item", "first-item");
        thirdElement.classList.replace("third-item", "second-item");
      } else if (firstElement.classList.contains("second-item")) {
        firstElement.classList.replace("second-item", "first-item");
        secondElement.classList.replace("third-item", "second-item");
        thirdElement.classList.replace("first-item", "third-item");
      } else if (firstElement.classList.contains("third-item")) {
        firstElement.classList.replace("third-item", "second-item");
        secondElement.classList.replace("first-item", "third-item");
        thirdElement.classList.replace("second-item", "first-item");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextBtn();
      if (currentIndex === 2) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div
      style={{ transformStyle: "preserve-3d" }}
      className="flex justify-center min-h-[100vh]"
    >
      <div
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        className="relative flex h-full w-full"
      >
        <div
          className="first-item transition-all duration-1000 transform-origin-bottom select-none absolute w-[112px] h-[140px] text-black top-[150px] left-[calc(30%-100px)] z-10"
          ref={firstItemRef}
        >
          <Image src="image-1.png" alt="image-1" />
        </div>
        <div
          className="second-item transition-all duration-1000 transform-origin-bottom absolute w-[112px] h-[140px] text-black top-[150px] left-[calc(30%-100px)] z-20"
          ref={secondItemRef}
        >
          <Image src="image-2.png" alt="image-2" />
        </div>
        <div
          className="third-item transition-all duration-1000 transform-origin-bottom absolute w-[112px] h-[140px] text-black top-[150px] left-[calc(30%-100px)] z-30"
          ref={thirdItemRef}
        >
          <Image src="image-3.png" alt="image-3" />
        </div>
        <div className="absolute left-[calc(30%+667px)] top-[150px] w-[340px]">
          <h2 className="text-center text-black text-[22px] mb-5">
            {(currentIndex + 1).toString().padStart(2, "0")}
          </h2>
          <h3 className="text-[22px] text-title mb-5">
            {content[currentIndex].title}
          </h3>
          <p className="text-base text-description">
            {content[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
