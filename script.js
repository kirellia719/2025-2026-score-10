const LIST_SERVER = [`https://2025-2026-score-10-be.vercel.app`];

const searchBtn = document.getElementById("search-btn");
const formUI = document.getElementById("form");
const wrapper = document.getElementById("wrapper");

const MRound = (n) => {
   return Math.round(n * 1000) / 1000;
};

const showProfile = (info) => {
   const { math = 0, english = 0, literature = 0, extra = 0, SBD = "", fullname = "", born = "", result } = info;

   const isAbsence = !math && !english && !literature;

   const sum = MRound(extra + math + english + literature);

   const profile = `
    <div class="profile" id="profile">
      <div class="line">
        <div class="title">Số báo danh:</div>
        <div class="value">${SBD}</div>
      </div>
      <div class="line">
        <div class="title">Họ và tên:</div>
        <div class="value" >${fullname}</div>
      </div>
      <div class="line">
        <div class="title">Ngày sinh:</div>
        <div class="value" >${born}</div>
      </div>
      ${
         isAbsence
            ? `<div style="font-size: 1.5rem; color: red">Vắng thi</div>`
            : `
            <div class="line">
              <div class="title">Điểm kiểm tra:</div>
            </div>
            <div class="line">
              <div class="score">
                <div class="">Toán:</div>
                <div class="value" >${MRound(math)}</div>
              </div>
              <div class="score">
                <div class="">Văn:</div>
                <div class="value" >${MRound(literature)}</div>
              </div>
              <div class="score">
                <div class="">Anh:</div>
                <div class="value" >${MRound(english)}</div>
              </div>
              <div class="score">
                <div class="">Điểm khuyến khích:</div>
                <div class="value" >${MRound(extra)}</div>
              </div>
            </div>
            <div class="line sum">
              <div class="score">
                <div class="">Tổng điểm:</div>
                <div class="value" style="color: #fa995e">${sum}</div>
              </div>
              ${
                 result != null
                    ? `<div class="score" >
                <div class="value" style="color: ${result ? "green" : "red"}">${
                         result == true ? "Trúng tuyển" : "Không trúng tuyển"
                      }</div>`
                    : ""
              }
              </div>
            </div>
      `
      }
    </div>
  `;
   wrapper.innerHTML = profile;
};

const loader = `<div><div class="loader"></div></div>`;

const searchAction = async (e) => {
   e.preventDefault();
   let SBDInput = document.getElementById("SBD-input").value;
   SBDInput = SBDInput.trim();
   if (SBDInput) {
      wrapper.innerHTML = loader;
      let index = Math.floor(Math.random() * LIST_SERVER.length);
      const SERVER_URL = LIST_SERVER[index];
      fetch(`${SERVER_URL}/candidates/${SBDInput}`)
         .then((r) => r.json())
         .then((data) => {
            showProfile(data);
         })
         .catch(() => {
            const error = `<div>Không tìm thấy SBD <b>${SBDInput}</b></div>`;
            wrapper.innerHTML = error;
         });
   }
};

searchBtn.addEventListener("click", searchAction);
formUI.addEventListener("submit", searchAction);
