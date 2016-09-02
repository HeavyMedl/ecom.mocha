let config = JSON.parse(require('fs').readFileSync('config.json'));

let self = module.exports = {
	get_environments_by_region : function(region) {
		let environments = config.environments;
		try {
			for (var i = environments.length - 1; i >= 0; i--) {
				if (region == 'ca') {
					environments[i].domain = environments[i].domain
						.replace('[region]',region)
						.replace('[suffix]',region)
				} else {
					environments[i].domain = environments[i].domain
						.replace('[region]','')
						.replace('[suffix]',region)
				}
			}
		} catch (error) { console.error(error) }
		return environments;
	},
	get_domain_by_name : function(name) {
		let domain = "";
		try {
			for (var i = config.environments.length - 1; i >= 0; i--) {
				if (config.environments[i].name == name) {
					domain = config.environments[i].name;
					break;
				}
			}
		} catch (error) { console.error(error) }
		return domain;
	},

}