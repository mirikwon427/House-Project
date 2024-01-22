import { useEffect } from 'react';
import geojson from '../../datas/geo.json';
import './kakaomap.css';

const { kakao } = window;

const hotPlaces = [
  '양천구',
  '영등포구',
  '강남구',
  '중구',
  '은평구',
  '송파구',
  '강동구',
];

export default function MainMap() {
  useEffect(() => {
    let data = geojson.features;

    let polygons = [];

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 9, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const customOverlay = new kakao.maps.CustomOverlay({});

    const getCentroid = (points) => {
      var area = 0,
        cx = 0,
        cy = 0;

      for (var i = 0; i < points.length; i++) {
        var j = (i + 1) % points.length;

        var pt1 = points[i];
        var pt2 = points[j];

        var x1 = pt1[0];
        var x2 = pt2[0];
        var y1 = pt1[1];
        var y2 = pt2[1];

        area += x1 * y2;
        area -= y1 * x2;

        cx += (x1 + x2) * (x1 * y2 - x2 * y1);
        cy += (y1 + y2) * (x1 * y2 - x2 * y1);
      }

      area /= 2;
      area = Math.abs(area);

      cx = cx / (6.0 * area);
      cy = cy / (6.0 * area);

      return {
        x: Math.abs(cx),
        y: Math.abs(cy),
      };
    };

    const createMarker = (coordinates) => {
      let points = [];

      coordinates.map((coordinate) => {
        let lat = coordinate[1];
        let long = coordinate[0];

        points.push([lat, long]);

        return coordinate;
      });

      return getCentroid(points);
    };

    const displayArea = (coordinates, name, color) => {
      let path = [];
      let points = [];

      coordinates[0].forEach((coordinate) => {
        let point = {};
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: path, // 폴리건 좌표 배열
        strokeWeight: 2, // 선 두께
        strokeColor: color, // 선 색
        strokeOpacity: 0.8, // 선 불투명도
        strokeStyle: 'solid', // 선 스타일
        fillColor: '#fff', // 채우기 색
        fillOpacity: 0.7, // 채우기 불투명도
      });

      polygons.push(polygon);

      //   // 다각형 mouseover 이벤트
      //   // 지역명을 표시하는 커스텀오버레이를 지도위에 표시
      //   kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
      //     polygon.setOptions({ fillColor: '#09f' });

      //     customOverlay.setContent('<div class="area">' + name + '</div>');

      //     customOverlay.setPosition(mouseEvent.latLng);
      //     customOverlay.setMap(map);
      //   });

      //   // 다각형 mousemove 이벤트
      //   kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
      //     customOverlay.setPosition(mouseEvent.latLng);
      //   });

      //   // 다각형 mouseout 이벤트
      //   // 커스텀 오버레이를 지도에서 제거
      //   kakao.maps.event.addListener(polygon, 'mouseout', function () {
      //     polygon.setOptions({ fillColor: '#fff' });
      //     customOverlay.setMap(null);
      //   });

      //   // 다각형에 click 이벤트
      //   kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
      //     console.log('클릭됨!!!');
      //   });

      let result = createMarker(coordinates[0]);

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(result.x, result.y);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', () => {
        console.log('마커클릭:::', name);
      });

      var iwContent = `<span class="info-title">${name}</span>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(result.x, result.y); //인포윈도우 표시 위치입니다

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      });

      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(map, marker);

      var infoTitle = document.querySelectorAll('.info-title');
      infoTitle.forEach(function (e) {
        var w = e.offsetWidth + 5;
        var ml = w / 2;
        e.parentElement.style.top = '82px';
        e.parentElement.style.left = '50%';
        e.parentElement.style.marginLeft = -ml + 'px';
        e.parentElement.style.width = w + 'px';
        e.parentElement.previousSibling.style.display = 'none';
        e.parentElement.parentElement.style.border = '0px';
        e.parentElement.parentElement.style.background = 'unset';
      });
    };

    data
      .filter((v) => hotPlaces.includes(v.properties.SIG_KOR_NM))
      .forEach((val) => {
        let coordinates = val.geometry.coordinates;
        let name = val.properties.SIG_KOR_NM;
        let color = val.properties.color;

        displayArea(coordinates, name, color);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full pb-6 text-3xl font-extrabold">거래 많은 지역</div>

      <div
        id="map"
        className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center items-center"
      ></div>
    </div>
  );
}
