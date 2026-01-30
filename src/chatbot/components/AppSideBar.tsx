/*
*
*/
import { useState } from "react";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { Sidebar as SidebarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { User2 } from "lucide-react"

import "../App.css";

import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/shared/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
type DropdownItem = {
  title: string;
  url: string;
};

type items = {
  title: string;
  url?: string;
  icon?: React.ElementType | null;
  isNewChat?: boolean;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
};

type SidebarProps = {
  onNewChat?: () => void;
};

const items = [
  { title: "Chatbot" },
  { title: "New Chat", icon: MessageCircle, isNewChat: true },
  { title: "Chat1", url: "/chat", icon: null },
  { title: "Chat2", url: "/chat", icon: null },
  { title: "Chat3", url: "/chat", icon: null },
  {
    title: "All Conversations",
    url: "/history",
    icon: null,
    isDropdown: true,
    dropdownItems: [
      { title: "Chat 4", url: "/chat/1" },
      { title: "Chat 5", url: "/chat/2" },
      { title: "Chat 6", url: "/chat/3" },
    ],
  },
];


export default function AppSidebar( {onNewChat} : SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || 'username';

  function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        navigate('/login');
    }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => prev);
  };

  const toggleDropdown = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown((prev) => (prev === title ? null : title));
  };
  const handleItemClick = (
    item: items,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (item.isDropdown) {
      toggleDropdown(item.title, e);
      return;
    }

    if (item.isNewChat) {
      onNewChat?.();
      setIsSidebarOpen(true);
      return;
    }

    if (item.url && location.pathname !== item.url) {
      navigate(item.url);
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      
      {!isSidebarOpen && (
        <button className="floating-sidebar-toggle" onClick={toggleSidebar}>
          <SidebarIcon />
        </button>
      )}

      {isSidebarOpen && (
        <div className="sidebar-container">
          <SidebarHeader>
          </SidebarHeader>
          <SidebarContent style={{"minHeight": "85%"}}>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button
                        type="button"
                        onClick={(e) => handleItemClick(item, e)}
                        className="flex items-center space-x-2"
                      >
                        {item.icon ? (
                          <item.icon className="mr-2"/>
                        ) : (
                          <span className="mr-2" />
                        )}

                        <span
                          style={{
                            color: index === 0 ? "blue" : "black",
                            fontWeight: index === 0 ? "bold" : "normal",
                            fontSize: index === 0 ? "20px" : "normal",
                          }}
                        >
                          {item.title}
                        </span>
                        {item.title === "Chatbot" && (
                          <SidebarIcon className="close-sidebar-icon" style={{marginLeft:'60px'}}
                            onClick={(e) => {
                              e.stopPropagation();  
                              e.preventDefault();   
                              toggleSidebar();      
                            }}
                          />
                        )}
                        {item.isDropdown && (
                          openDropdown === item.title ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        )}
                      </button>
                    </SidebarMenuButton>

                    {item.isDropdown && openDropdown === item.title && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={dropdownItem.url}
                            className="dropdown-item"
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 /> {username}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem  onClick={handleLogout}>
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
      )}
    </>
  );
}
