const LIST_SERVER = [`https://2025-2026-score-10-be.vercel.app`, `https://2025-2026-score-10-be-faic.vercel.app`];

const searchBtn = document.getElementById("search-btn");
const formUI = document.getElementById("form");
const wrapper = document.getElementById("wrapper");

const MRound = (n) => {
   return Math.round(n * 1000) / 1000;
};

const DiemChuan = 15.99;

const ribbon = (result) => {
   if (result) {
      return `<div class="fancy-ribbon pass">
               <span>🏅 Trúng tuyển</span>
            </div>`;
   } else
      return `<div class="fancy-ribbon fall">
               <span>Không trúng tuyển</span>
            </div>`;
};

const noti = (result) => {
   if (result) {
      return `<i class="noti">
               Xin chúc mừng thí sinh. <br/>
               Phụ huynh và thí sinh vui lòng nộp hồ sơ
               <p>từ ngày 6/6/2025 đến 16h 13/6/2025</p>
            </i>`;
   } else return ` <i class="noti">~ Rất tiếc, thí sinh chưa trúng tuyển. ~ </i>`;
};

const showProfile = (info) => {
   const { math = 0, english = 0, literature = 0, extra = 0, SBD = "", fullname = "", born = "", checked = 0 } = info;

   const isAbsence = !math && !english && !literature;

   const sum = MRound(extra + math + english + literature);

   const result = sum >= DiemChuan;
   const profile = `
    <div class="card">
            <div class="information">
               <div class="avatar">
                  <img src="./avatar-nam.jpg" alt="">
               </div>
               <div class="basic-info">
                  <div class="info name">${fullname}</div>

                  <div class="info sbd">
                     <div>SBD:</div>
                     <div>${SBD}</div>
                  </div>
                  <div class="info birth">
                     <div>Sinh ngày:</div>
                     <div>${born}</div>
                  </div>
               </div>
            </div>
            <div class="score-information">
               <div class="subject-group">
                  <div class="subject">
                     <div class="score">${MRound(literature)}</div>
                     <div class="subname">Tiềng Việt</div>
                  </div>
                  <div class="subject">
                     <div class="score">${MRound(math)}</div>
                     <div class="subname">Toán</div>
                  </div>
                  <div class="subject">
                     <div class="score">${MRound(english)}</div>
                     <div class="subname">Anh</div>
                  </div>

               </div>
               <hr>
               <div class="sum">
                  <span class="sum-title">Tổng điểm ${extra ? `<span class="extra">+ ${extra}</span>` : ""} </span>
                  <span class="sum-score ${checked ? "line-through" : ""}">${MRound(sum)}</span>
               </div>
               ${
                  checked
                     ? `<div class="sum">
                  <span class="sum-title">Sau phúc khảo </span>
                  <span class="sum-score">${MRound(checked)}</span>
               </div>`
                     : ""
               }
               <hr>
            </div>
            ${result != null ? ribbon(result) : ""}
            ${result != null ? noti(result) : ""}
         </div>
  `;
   return profile;
};

const loader = `<div><div class="loader"></div></div>`;

const hiddenScore = () => {
   const content = `<div>Chưa có kết quả</div>`;
   wrapper.innerHTML = content;
};

const searchAction = async (e) => {
   e.preventDefault();
   let SBDInput = document.getElementById("SBD-input").value;
   SBDInput = SBDInput.trim();
   if (SBDInput) {
      // hiddenScore();
      wrapper.innerHTML = loader;
      let index = Math.floor(Math.random() * LIST_SERVER.length);
      const SERVER_URL = LIST_SERVER[index];
      fetch(`${SERVER_URL}/candidates/${SBDInput}`)
         .then((r) => r.json())
         .then((data) => {
            wrapper.innerHTML = showProfile(data);
         })
         .catch(() => {
            const error = `<div style="padding: 5px 10px; background-color: white; border-radius: 4px;">Không tìm thấy SBD <b>${SBDInput}</b></div>`;
            wrapper.innerHTML = error;
         });
   }
};

searchBtn.addEventListener("click", searchAction);
formUI.addEventListener("submit", searchAction);
