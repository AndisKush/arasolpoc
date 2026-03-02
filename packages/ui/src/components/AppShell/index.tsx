"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import type { AppShellProps, MenuItem } from "./types";
import * as S from "./styles";
import { Button } from "../Button";
import { useTheme } from "../../styles/provider";

export const AppShell = ({
  children,
  menuItems,
  sidebarCollapsed = false,
  onToggleSidebar,
  headerContent,
  onNavigate,
}: AppShellProps) => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleSubmenu(item.id);

      setMobileMenuOpen((prev) => (prev === item.id ? null : item.id));
    } else {
      onNavigate?.(item);
      setMobileMenuOpen(null);
    }
  };

  // --- Renderizadores ---

  const renderDesktopMenu = (items: MenuItem[]) =>
    items.map((item) => (
      <React.Fragment key={item.id}>
        <S.DesktopMenuItem onClick={() => handleItemClick(item)}>
          {item.icon}
          {!sidebarCollapsed && (
            <>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.children &&
                (openSubmenus[item.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                ))}
            </>
          )}
        </S.DesktopMenuItem>

        {!sidebarCollapsed && item.children && openSubmenus[item.id] && (
          <S.SubMenuContainer>
            {renderDesktopMenu(item.children)}
          </S.SubMenuContainer>
        )}
      </React.Fragment>
    ));

  const renderMobileMenu = (items: MenuItem[]) =>
    items
      .filter((i) => !i.hiddenOnMobile)
      .map((item) => {
        const isActive = mobileMenuOpen === item.id;
        return (
          <S.MobileNavItem
            key={item.id}
            onClick={() => handleItemClick(item)}
            $active={isActive}
          >
            {isActive && item.children ? <ChevronDown size={20} /> : item.icon}
            <span>{item.label}</span>
          </S.MobileNavItem>
        );
      });

  return (
    <S.ShellContainer>
      {/* DESKTOP SIDEBAR */}
      <S.Sidebar $collapsed={sidebarCollapsed}>
        <div
          style={{
            padding: "16px",
            display: "flex",
            justifyContent: sidebarCollapsed ? "center" : "space-between",
            alignItems: "center",
          }}
        >
          {!sidebarCollapsed && <strong>LinkApi</strong>}
          <Button
            variant="outline"
            onClick={onToggleSidebar}
            style={{ padding: "4px" }}
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {renderDesktopMenu(menuItems)}
        </nav>

        <S.SidebarFooter>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            style={{
              width: "100%",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
            }}
          >
            {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            {!sidebarCollapsed && (
              <span style={{ marginLeft: "8px" }}>
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </Button>
        </S.SidebarFooter>
      </S.Sidebar>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <S.Header>
          {headerContent || "Dashboard"}
        </S.Header>

        <S.MainContent>{children}</S.MainContent>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <S.BottomNav>{renderMobileMenu(menuItems)}</S.BottomNav>

      {/* MOBILE SUBMENU DRAWER  */}
      {mobileMenuOpen && (
        <S.MobileMenuDrawer>
          <S.DrawerHeader>
            <span>{menuItems.find((i) => i.id === mobileMenuOpen)?.label}</span>
            <X
              size={20}
              onClick={() => setMobileMenuOpen(null)}
              style={{ cursor: "pointer" }}
            />
          </S.DrawerHeader>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {menuItems
              .find((i) => i.id === mobileMenuOpen)
              ?.children?.filter((sub) => !sub.hiddenOnMobile)
              .map((sub) => (
                <Button
                  key={sub.id}
                  variant="secondary"
                  onClick={() => {
                    onNavigate?.(sub);
                    setMobileMenuOpen(null);
                  }}
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  {sub.label}
                </Button>
              ))}
          </div>
        </S.MobileMenuDrawer>
      )}
    </S.ShellContainer>
  );
};
