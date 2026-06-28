import React, { useRef } from 'react'
import {Link} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const Sidebar = SidebarComponent as any;

const MobileSidebar = () => {
    const sidebarRef = useRef<any>(null);
    const toggleSidebar = () => {
        sidebarRef.current?.toggle();
    }

    return (
        <div className="mobile-sidebar wrapper">
            <header>
                <Link to="/">
                    <img
                        src="/assets/icons/logo.svg"
                        alt="Logo"
                        className="size-[30px]"
                    />

                    <h1>Tourvisto</h1>
                </Link>

                <button onClick={() => sidebarRef.current?.toggle()}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>


            </header>

            <Sidebar
                width={270}
                ref={sidebarRef}
                created={() => sidebarRef.current?.hide()}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
            >
                <NavItems handleClick={toggleSidebar} />

            </Sidebar>
        </div>
    )
}
export default MobileSidebar
