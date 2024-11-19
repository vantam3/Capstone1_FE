module.exports = function override(config) {
    config.module.rules = config.module.rules.map((rule) => {
        if (rule.enforce === 'pre' && rule.use) {
            rule.use = rule.use.filter((loader) => !loader.includes('source-map-loader'));
        }
        return rule;
    });
    return config;
};
