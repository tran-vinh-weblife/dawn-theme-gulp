class HeaderMenu {
    constructor() {
        this.header = document.querySelector(".js-fixed-header");

        this.menuBtn = document.querySelector(".js-menu-toggle-btn");
        this.overlay = document.querySelector(".js-overlay");

        this.linksLv0 = document.querySelectorAll(".js-mega-menu-link-lv0");
        this.menuLv1 = document.querySelector(".js-menu-lv1");

        this.linksLv1 = document.querySelectorAll(".js-mega-menu-link-lv1");

        this.menuLv2 = document.querySelectorAll(".js-menu-lv2");
        this.linksLv2 = document.querySelectorAll(".js-mega-menu-link-lv2");

        this.menuLv3 = document.querySelectorAll(".js-menu-lv3");

        this.backPrevBtns = document.querySelectorAll(".js-submenu-back");

        this.bindEvents();
    }

    bindEvents = () => {
        this.toggleMenuWithBtn();
        this.showSubMenuDetails();
        this.addSubMenu(this.linksLv1, this.menuLv2);
        this.addSubMenu(this.linksLv2, this.menuLv3);
        this.backPrevSub();
        this.overlayToggle();
        this.scrollToFixed();
    };

    scrollToFixed() {
        const toggleClassFixedClass = (type = "add") => {
            const ulMenuLv1 = this.menuLv1.querySelector(".js-mega-list");

            this.header.classList[type]("is-fixed");
            ulMenuLv1.classList[type]("is-fixed");

            [this.menuLv2, this.menuLv3].forEach((menus) => {
                menus.forEach((el) => {
                    const ul = el.querySelector(".js-mega-list");
                    ul.classList[type]("is-fixed");
                });
            });
        };

        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 180) {
                toggleClassFixedClass("add");
            } else {
                toggleClassFixedClass("remove");
            }
        });
    }

    toggleMenu() {
        //,emuLv1
        const isShow = !this.menuLv1.classList.contains("is-open");

        if (isShow) {
            this.menuBtn.classList.add("isClose");
            this.menuLv1.classList.add("is-open");
            this.overlay.classList.add("is-open");
        } else {
            this.menuBtn.classList.remove("isClose");
            this.menuLv1.classList.remove("is-open");
            this.overlay.classList.remove("is-open");

            this.removeAllSubMenu();
            this.activeBgLink("removeAll");
        }
    }

    overlayToggle() {
        this.overlay.addEventListener("click", () => {
            this.toggleMenu();
        });
    }

    toggleMenuWithBtn() {
        this.menuBtn.addEventListener("click", () => {
            this.toggleMenu();
        });
    }

    activeBgLink(type = "add", links = []) {
        switch (type) {
            case "add":
                links.classList.add("active");
                break;
            case "remove":
                links.classList.remove("active");
                break;
            case "removeLv1":
                const activeLinksLv1 = document.querySelectorAll(".js-mega-menu-link-lv1.active");
                activeLinksLv1.forEach((el) => {
                    el.classList.remove("active");
                });
                break;
            case "removeLv2":
                const activeLinksLv2 = document.querySelectorAll(".js-mega-menu-link-lv2.active");
                activeLinksLv2.forEach((el) => {
                    el.classList.remove("active");
                });
                break;
            case "removeAll":
                const activeLinks = document.querySelectorAll(".mega-menu__link.active");
                activeLinks.forEach((el) => {
                    el.classList.remove("active");
                });
                break;
        }
    }

    addSubMenu(links, subMenus) {
        links.forEach((el) => {
            el.addEventListener("click", (event) => {
                event.preventDefault();

                const subMenu = el.nextElementSibling;
                const isSubMenuOpen = subMenu.classList.contains("is-open");
                const isLinkLv1 = el.classList.contains("js-mega-menu-link-lv1");

                if (!isSubMenuOpen) {
                    
                    if (isLinkLv1) {
                        this.removeSubMenu(this.menuLv3);
                        this.removeSubMenu(subMenus);
                        this.activeBgLink("removeLv1");
                    } else {
                        this.removeSubMenu(subMenus);
                        this.activeBgLink("removeLv2");
                    }

                    this.activeBgLink("add", el);
                    el.nextElementSibling.classList.add("is-open");
                }
            });
        });
    }

    removeSubMenu(subMenus) {
        subMenus.forEach((el) => {
            el.classList.remove("is-open");
        });
    }

    removeAllSubMenu() {
        const openedSubMenuLv2 = document.querySelector(".js-menu-lv2.is-open");
        const openedSubMenuLv3 = document.querySelector(".js-menu-lv3.is-open");

        openedSubMenuLv2?.classList.remove("is-open");
        openedSubMenuLv3?.classList.remove("is-open");
    }

    showSubMenuDetails() {
        this.linksLv0.forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();

                const dataIndex = el.getAttribute("data-index");
                const subMenuOfIndex = document.querySelector(
                    `.js-mega-menu-link-lv1[data-index="${dataIndex}"]`
                );
                const isShowSubMenu =
                    !subMenuOfIndex.nextElementSibling.classList.contains("is-open");

                if (isShowSubMenu) {
                    const isMenuLv1Showing = this.menuLv1.classList.contains("is-open");

                    this.removeAllSubMenu();

                    if (!isMenuLv1Showing) {
                        this.toggleMenu();
                    }

                    subMenuOfIndex.nextElementSibling.classList.add("is-open");
                    this.activeBgLink("removeLv1");
                    this.activeBgLink("add", subMenuOfIndex);
                }
            });
        });
    }

    backPrevSub() {
        // Mobile
        this.backPrevBtns.forEach((el) => {
            el.addEventListener("click", () => {
                console.log(el.parentElement.parentElement);
                el.parentElement.parentElement.classList.remove("is-open");
            });
        });
    }
}

new HeaderMenu();
