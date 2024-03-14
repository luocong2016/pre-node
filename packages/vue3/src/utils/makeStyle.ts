import type { GlobalToken } from "ant-design-vue/es/theme/interface"
import type { GenerateStyle } from "ant-design-vue/es/theme/internal"
import { genComponentStyleHook } from "ant-design-vue/es/theme/internal"

import useConfigInject from "ant-design-vue/es/config-provider/hooks/useConfigInject"
import { mergeToken } from "ant-design-vue/es/theme/internal"
import classNames from "ant-design-vue/es/_util/classNames"

export type BaseLayoutDesignToken = {
  hashId: string
  colorPrimary: string
  /**
   * 跨站点应用的图标hover颜色
   */
  colorBgAppListIconHover: string
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIconHover: string
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIcon: string

  /**
   * layout 的背景颜色
   */
  bgLayout: string

  /**
   * 侧边side的 token 配置
   */
  sider: {
    colorBgCollapsedButton: string
    colorTextCollapsedButtonHover: string
    colorTextCollapsedButton: string
    colorMenuBackground: string
    menuHeight: number
    colorBgMenuItemCollapsedElevated: string
    colorMenuItemDivider: string
    colorBgMenuItemHover: string // 鼠标悬浮态
    colorBgMenuItemActive: string // 激活态
    colorBgMenuItemSelected: string
    colorTextMenuSelected: string
    colorTextMenuItemHover: string
    colorTextMenuActive: string
    colorTextMenu: string
    colorTextMenuSecondary: string
    paddingInlineLayoutMenu: number
    paddingBlockLayoutMenu: number
    /**
     * menu 顶部 title 的字体颜色
     */
    colorTextMenuTitle: string
    colorTextSubMenuSelected: string
  }
  /**
   * header 的 token 设置
   */
  header: {
    colorBgHeader: string
    colorBgScrollHeader: string
    colorHeaderTitle: string
    colorBgMenuItemHover: string
    colorBgMenuElevated: string
    colorBgMenuItemSelected: string
    colorTextMenuSelected: string
    colorTextMenuActive: string
    colorTextMenu: string
    colorTextMenuSecondary: string
    colorBgRightActionsItemHover: string
    colorTextRightActionsItem: string
    heightLayoutHeader: number
  }

  /**
   * pageContainer
   */
  pageContainer: {
    /**
     * pageContainer 的背景颜色
     */
    colorBgPageContainer: string
    /**
     * pageContainer 自带的 margin inline
     * @deprecated 请使用 paddingInlinePageContainerContent
     */
    marginInlinePageContainerContent: number
    /**
     * pageContainer 自带的 margin block
     * @deprecated 请使用 paddingBlockPageContainerContent
     */
    marginBlockPageContainerContent: number
    /**
     * pageContainer 自带的 padding inline
     */
    paddingInlinePageContainerContent: number
    /**
     * pageContainer 自带的 padding block
     */
    paddingBlockPageContainerContent: number
    /**
     * pageContainer 被固定时的背景颜色
     */
    colorBgPageContainerFixed: string
  }
}

export type LayoutDesignToken = BaseLayoutDesignToken

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type ProTokenType = {
  layout?: DeepPartial<LayoutDesignToken>
}

export type ProAliasToken = GlobalToken &
  ProTokenType & {
    themeId: number
    proComponentsCls: string
    antCls: string
  }

/**
 * 用于判断当前是否需要开启哈希（Hash）模式。
 * 首先也会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 false。否则，直接返回 true 表示需要打开。
 * @returns
 */
export const isNeedOpenHash = () => {
  if (
    typeof process !== "undefined" &&
    (process.env.NODE_ENV?.toUpperCase() === "TEST" ||
      process.env.NODE_ENV?.toUpperCase() === "DEV")
  ) {
    return false
  }
  return true
}

export type { GlobalToken, GenerateStyle }

export { mergeToken, genComponentStyleHook, useConfigInject, classNames }
