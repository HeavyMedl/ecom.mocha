let config = JSON.parse(require('fs').readFileSync('config.json'));

let self = module.exports = {
	/**
	 * Returns the config.json.environments array of objects.
	 * Region is used to substitute into the domain name of each
	 * environment. Optionally you can provide an array of 
	 * environments to fetch specifically (["DEV","DIT2","QA2"])
	 * otherwise this function will return all environments.
	 * @param  {[type]} region  [description]
	 * @param  {[type]} env_arr [description]
	 * @return {[type]}         [description]
	 */
	get_environments : function(region, env_arr) {
		let environments = config.environments,
			return_envs = env_arr ? [] : environments;
		try {
			for (var i = environments.length - 1; i >= 0; i--) {
				if (env_arr && env_arr.indexOf(environments[i].name) == -1) {
					continue;
				}
				if (region == 'ca') {
					environments[i].domain = environments[i].domain
						.replace('[region]',region)
						.replace('[suffix]',region)
				} else {
					environments[i].domain = environments[i].domain
						.replace('[region]','')
						.replace('[suffix]',region)
				}
				return_envs.push(environments[i]);
			}
		} catch (error) { console.error(error) }
		return return_envs;
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