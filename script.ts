type Race = [number[], number[], number[]];
interface IData {
    imgUrl: string;
}
const hand = document?.querySelector<HTMLElement>(".handmade");
const direct = document.querySelector<HTMLElement>(".directions");
const first = document.querySelector<HTMLElement>(".first");
const second = document.querySelector<HTMLElement>(".second");
const third = document.querySelector<HTMLElement>(".third");
const main = document.querySelector<HTMLElement>(".main");
const func = document.querySelector<HTMLElement>(".functional");
const race: Race = [
    [1, 2],
    [3, 4],
    [5, 6, 7, 8],
];
let newRace: any = [];
let firstB = false;
let secondB = false;
let thirdB = false;
let nextB = false;
let cId: number = 245;

main?.addEventListener("click", (e) => {
    const target = e.target as Element;
    if (target.closest(".handmade")) {
        newRace = [];
        direct?.classList.toggle("active");
        if (hand!.textContent === "Ввести вручную") {
            hand!.style.backgroundColor = "rgb(123, 86, 81)";
            hand!.textContent = "Отмена";
        } else {
            firstB = false;
            secondB = false;
            thirdB = false;
            first!.style.backgroundColor =
                second!.style.backgroundColor =
                third!.style.backgroundColor =
                hand!.style.backgroundColor =
                    ``;
            hand!.textContent = "Ввести вручную";
            cId = 245;
            newRace = [];
        }
    } else if (target.closest(".first") && !firstB) {
        firstB = true;
        cId -= 30;
        first!.style.backgroundColor = `rgb(${cId - 20}, ${cId - 80}, ${
            cId - 90
        })`;
        newRace.push(shuffle(race[0]));
    } else if (target.closest(".second") && !secondB) {
        secondB = true;
        cId -= 30;
        second!.style.backgroundColor = `rgb(${cId - 20}, ${cId - 80}, ${
            cId - 90
        })`;
        newRace.push(shuffle(race[1]));
    } else if (target.closest(".third") && !thirdB) {
        thirdB = true;
        cId -= 30;
        third!.style.backgroundColor = `rgb(${cId - 20}, ${cId - 80}, ${
            cId - 90
        })`;
        newRace.push(shuffle(race[2]));
    } else if (target.closest(".generator") && !firstB && !secondB && !thirdB) {
        for (let m of shuffle(race)) {
            newRace.push(shuffle(m));
        }
    }

    if (target.closest(".next") && newRace.length === 3) {
        let there = Math.ceil(newRace[0][0] / 2);
        if (there > 3) {
            there = 3;
        }
        nextGameMode(newRace[0], there);
    }
    if (newRace.length === 3 && !nextB) {
        nextB = true;
        func?.insertAdjacentHTML(
            "beforeend",
            "<div class = 'next btn'>Готово</div>"
        );
    }
});

function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
}

function nextGameMode(direct: number[], dir: number) {
    // Это вся карта и все блоки, стрелки, связанные с ней

    let i = 0;
    const mapInfo =
        '<div class="container"><img class="map" src="https://nogorka.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7aed9596-2f68-4fe2-bd93-afda8f41f84b%2F%D0%BA%D0%B0%D1%80%D1%82%D0%B0_7_(2).png?table=block&id=b4b5ac18-44e7-4012-b475-bb7fc3d21dfe&spaceId=c9a0c80a-fa80-4f80-918b-c8cacbaa72cc&width=2000&userId=&cache=v2" alt="#"><img class="arrow1 arrow none" src="https://static.vecteezy.com/system/resources/previews/001/187/070/original/arrow-png.png" alt=">"><img class="arrow2 arrow none" src="https://static.vecteezy.com/system/resources/previews/001/187/070/original/arrow-png.png" alt=">"><img class="arrow3 arrow none" src="https://static.vecteezy.com/system/resources/previews/001/187/070/original/arrow-png.png" alt=">"></div><script src="script.js"></script>';
    document.body.innerHTML = mapInfo;
    const container = document.querySelector<HTMLElement>(".container");
    const mapRoad = document.querySelector<HTMLElement>(".map");
    const firstArrow = document.querySelector<HTMLElement>(`.arrow${dir}`);
    const arrow1 = document.querySelector<HTMLElement>(".arrow1");
    const arrow2 = document.querySelector<HTMLElement>(".arrow2");
    const arrow3 = document.querySelector<HTMLElement>(".arrow3");
    // Функция получения информации с сервера
    async function methodGet(url: string) {
        let data = await fetch(url);
        if (!data.ok) {
            throw new Error(`data error ${data.status}`);
        }
        return await data.json();
    }
    function createMap() {
        let targetElem = document.createElement("div");
        targetElem.classList.add("mainTarget");
        if (dir > 3) {
            dir = 3;
        }
        // Куда пройти и как отобразить слово пройти
        if (dir === 2) {
            targetElem.textContent = `Пройти во ${dir} комнату`;
        } else {
            targetElem.textContent = `Пройти в ${dir} комнату`;
        }
        firstArrow?.classList.toggle("none");
        mapRoad!.style.opacity = "0.3";
        firstArrow!.style.opacity = "0.5";
        // Вставка самой кнопки
        container?.insertAdjacentElement("afterbegin", targetElem);
        console.log(targetElem);
        return targetElem;
    }
    let targetElem = createMap();

    function Event(there: number, remove: any) {
        targetElem.style.opacity = "0";
        // Информация в виде интерфейса IData или Promise, в том числе с возможной ошибкой
        let info: IData | any = methodGet(
            // Сервер https://smth/smth/smth/ с експонатом под номером there
            `https://smth/smth/smth/${there}`
        );
        // Контент с картинкой-кодом с кнопками и т.

        let infoContent = `<div class="info"><div class="there">Точка N${there}</div><a-assets><a-asset-item id="target-file" src="${info.imgUrl}"/></a-assets><a-entity zappar-image="#target-file"><a-entity src="${ent}/${there}"></a-entity></a-entity><div class="nextInfo">Следующий экспонат</div></div>`;
        document.body.insertAdjacentHTML("beforeend", infoContent);
        let nextInfo = document.querySelector<HTMLElement>(".nextInfo");

        i++;
        nextInfo?.addEventListener("click", (e) => {
            document.body.removeEventListener("click", remove);
            document.body.innerHTML = mapInfo;
            let mapRoad = document.querySelector<HTMLElement>(".map");
            let firstArrow = document.querySelector<HTMLElement>(
                `.arrow${dir}`
            );
            mapRoad!.style.opacity = "0.3";
            firstArrow!.style.opacity = "0.5";
            Event(direct[i], e.target);
        });
    }
    // При нажатии на кнопку пройти, выстраивается блок с информацией, получаемой из сервера
    targetElem.addEventListener("click", (e) => {
        Event(direct[i], e.target);
    });
}
