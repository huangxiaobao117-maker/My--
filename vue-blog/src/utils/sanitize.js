/**
 * XSS防护工具函数
 * 用于清理用户输入，防止跨站脚本攻击
 */

/**
 * HTML转义函数
 * 将特殊字符转换为HTML实体
 * @param {string} str - 需要转义的字符串
 * @returns {string} - 转义后的字符串
 */
export const escapeHtml = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return str.replace(/[&<>"'`=\/]/g, (char) => escapeMap[char] || char);
};

/**
 * HTML反转义函数
 * 将HTML实体转换回普通字符
 * @param {string} str - 需要反转义的字符串
 * @returns {string} - 反转义后的字符串
 */
export const unescapeHtml = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  const unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '='
  };
  
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;/g, (entity) => unescapeMap[entity] || entity);
};

/**
 * 清理富文本内容
 * 只允许安全的HTML标签
 * @param {string} html - 需要清理的HTML内容
 * @returns {string} - 清理后的安全HTML
 */
export const sanitizeHtml = (html) => {
  if (!html || typeof html !== 'string') {
    return '';
  }
  
  // 允许的标签列表
  const allowedTags = [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
    'a', 'img'
  ];
  
  // 允许的属性列表
  const allowedAttributes = ['href', 'src', 'alt', 'title', 'target'];
  
  // 首先进行HTML转义
  let result = escapeHtml(html);
  
  // 然后恢复允许的标签
  allowedTags.forEach(tag => {
    const escapedTag = escapeHtml(tag);
    // 处理开始标签
    const startTagRegex = new RegExp(`&lt;${escapedTag}(\\s[^&]*)?&gt;`, 'gi');
    result = result.replace(startTagRegex, (match) => {
      // 检查属性
      const attrMatch = match.match(/&lt;${escapedTag}(.*?)&gt;/i);
      if (attrMatch && attrMatch[1]) {
        let attrs = attrMatch[1];
        // 过滤不允许的属性
        allowedAttributes.forEach(allowedAttr => {
          const attrRegex = new RegExp(`${escapeHtml(allowedAttr)}\\s*=\\s*["']([^"']*)["']`, 'gi');
          attrs = attrs.replace(attrRegex, (attrMatch, value) => {
            // 对于href和src，验证URL安全
            if (allowedAttr === 'href') {
              if (isValidUrl(value)) {
                return `${allowedAttr}="${value}"`;
              }
              return '';
            }
            if (allowedAttr === 'src') {
              if (isValidUrl(value) || value.startsWith('/')) {
                return `${allowedAttr}="${value}"`;
              }
              return '';
            }
            return `${allowedAttr}="${value}"`;
          });
        });
        return `<${tag}${attrs}>`;
      }
      return `<${tag}>`;
    });
    
    // 处理结束标签
    const endTagRegex = new RegExp(`&lt;/${escapedTag}&gt;`, 'gi');
    result = result.replace(endTagRegex, `</${tag}>`);
  });
  
  return result;
};

/**
 * 验证URL是否安全
 * @param {string} url - 需要验证的URL
 * @returns {boolean} - 是否安全
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsedUrl = new URL(url);
    // 只允许http和https协议
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

/**
 * 验证邮箱格式
 * @param {string} email - 需要验证的邮箱
 * @returns {boolean} - 是否有效
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 限制字符串长度
 * @param {string} str - 需要限制的字符串
 * @param {number} maxLength - 最大长度
 * @returns {string} - 截断后的字符串
 */
export const truncateString = (str, maxLength) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  if (str.length <= maxLength) {
    return str;
  }
  
  return str.substring(0, maxLength) + '...';
};

/**
 * 生成安全的ID
 * @returns {string} - 唯一的安全ID
 */
export const generateSafeId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
