(() => {
  const d = window.WHRG_DATA;
  d.sources.htwk = {
    label: "HTWK Leipzig · WHRG 5×5 Medium final",
    url: "https://www.htwk-leipzig.de/hochschule/aktuelles/newsdetail/artikel/roboterfussball-vizetitel-fuer-die-htwk-robots-bei-den-world-humanoid-robot-games-in-china"
  };
  d.sources.brazil = {
    label: "Team Brazil · RCAP Beijing Masters",
    url: "https://aloalobahia.com/noticias/2026/08/26/baiano-de-20-anos-supera-perrengues-na-china-e-ajuda-brasil-a-conquistar-titulo-inedito-na-robotica/"
  };

  const medium = d.events.find(e => e.id === "c13");
  if (medium) {
    medium.coverage = "partial";
    medium.source = "htwk";
    medium.placements = [
      {rank:1,team:"B-Human · Bremen",country:"DE",result:"13–3 в финале"},
      {rank:2,team:"HTWK Robots · Leipzig",country:"DE",result:"серебро"}
    ];
  }

  d.internationalHighlights.unshift(
    {country:"DE",team:"B-Human · Bremen",result:"1-е место · 13–3",event:"Футбол 5×5 · средние роботы",note:"Победитель финала WHRG 2026 против HTWK Robots.",source:"htwk"},
    {country:"DE",team:"HTWK Robots · Leipzig",result:"2-е место",event:"Футбол 5×5 · средние роботы",note:"В полуфинале HTWK обыграла Whirlwind 11:0; финал завершился 3:13 против B-Human.",source:"htwk"},
    {country:"BR",team:"Team Brazil",result:"1-е среди иностранных команд",event:"RCAP Beijing Masters · футбол",note:"Дополнительная футбольная сетка внутри программы WHRG, а не отдельная из 30 официальных медальных дисциплин. В основной сетке Team Brazil дошёл до четвертьфинала.",source:"brazil"}
  );
})();
