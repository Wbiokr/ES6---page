class Page {
  constructor({ page = 1, cbPrev = () => { }, cbNext = () => { }, cbJump = () => { }, cbSpot = () => { } }) {
    this.cbJump = cbJump;
    this.cbNext = cbNext;
    this.cbPrev = cbPrev;
    this.cbSpot = cbSpot;
    this.page = page || 1;
    this.pageTwo = 2;
    this.pageThree = 3;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.jumpPage = this.jumpPage.bind(this);
    this.spotPage = this.spotPage.bind(this);
    this.maxPage = 10;
    this.init();
  }
  init() {
    this.initItem();
    const self = this;
    document.querySelector('#wkr_next').addEventListener('click', this.nextPage);
    document.querySelector('#wkr_prev').addEventListener('click', this.prevPage);
    document.querySelector('#wkr_jump').addEventListener('click', this.jumpPage);
    document.querySelectorAll('.wkr_item').forEach((item, index) => {
      item.addEventListener('click', function () {

        self.spotPage(this.innerText);

      })
    })
  }
  prevPage() {
    this.page--;
    if (this.page === 0) {
      this.page++;
      alert('注意！！！已经是第一页了！！！')
      return;
    } else if (this.page > 3) {
      this.pageTwo = this.page - 1;
      this.pageThree = this.page;
    } else if (this.page <= 3) {
      this.pageTwo = 2;
      this.pageThree = 3;
    }
    this.cbPrev();
    this.initItem();
  }
  nextPage() {
    ++this.page;
    if (this.page > this.maxPage) {
      this.page--;
      alert('注意！！！已经是最后一页了！！！')
      return;
    } else {
      if (this.page >= 3 && this.page <= this.maxPage) {
        this.pageThree = this.page;
        this.pageTwo = this.page - 1;
      }
      this.cbNext();
      this.initItem();
    }
  }
  jumpPage() {
    const newPage = document.querySelector('#wkr_page').value;
    if (newPage < 1) {
      alert('请输如有效页码数！');
      return;
    }
    if (newPage <= 3) {
      this.pageTwo = 2;
      this.pageThree3;
    } else if (newPage < this.maxPage && newPage > 3) {
      this.pageTwo = newPage - 1;
      this.pageThree = newPage;
    } else {
      alert('sorry！页面已经超出查询范围，请重新输入！');
      return;
    }
    this.page = newPage;
    this.cbJump();
    this.initItem();
  }
  spotPage(v) {
    if (Number(v) === 1) {
      this.pageTwo = 2;
      this.pageThree = 3;
    }
    this.page = v;
    this.cbSpot();
    this.initItem();
  }
  initItem() {
    const pageItems = document.querySelectorAll('.wkr_item');

    pageItems[0].innerText = 1;
    pageItems[1].innerText = this.pageTwo;
    pageItems[2].innerText = this.pageThree;


    Array.from(pageItems, (item, index) => {
      const nowPage = Number(item.innerText);
      if (Number(nowPage) === Number(this.page)) {
        item.className = item.className + ' selected'
      } else {
        item.className = item.className.replace(/selected/g, '')
      }
    })
  }

}

const myPage = new Page({
  page: 2,

});