const APIS = {
  "organization_url": "https://api.github.com/orgs/{org}",
  "organization_repositories_url": "https://api.github.com/orgs/{org}/repos",
  "organization_teams_url": "https://api.github.com/orgs/{org}/teams",
  "public_gists_url": "https://api.github.com/gists/public",
  "repository_url": "https://api.github.com/repos/{owner}/{repo}",
  "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
  "topic_search_url": "https://api.github.com/search/topics?q={query}",
  "user_url": "https://api.github.com/users/{user}",
  "user_gists_url": "https://api.github.com/users/{user}/gists",
  "user_repositories_url": "https://api.github.com/users/{user}/repos",
  "user_repository_url": "https://api.github.com/repos/{user}/{repo_name}"
}

const axios = require("axios");
const { EventEmitter } = require("events");

class GithubTouch extends EventEmitter {
	constructor() {
		super();

		// other

		/*
			* parameters: query
			* return: Object || Error
		*/
		this.searchTopic = (query) => new Promise((resolve, reject) => {
			if (!query) return reject('missing: query parameter - read the docs: https://github-touch.github.io/');

			let api = APIS.topic_search_url.replace(/{query}/g, query);

			axios.get(api).then(res => {
				let data = res.data;
				resolve({
					query,
					totalCount: data.total_count,
					incompleteResults: data.incomplete_results,
					items: data.items
				});	
			}).catch(err => {
				reject(err)
			})
		})

		// user
		this.getUser = (username) => new Promise((resolve, reject) => {
			if (!username) return reject('missing: username parameter - read the docs: https://github-touch.github.io/');

			let beforeTime = Date.now();
			let api = APIS.user_url.replace(/{user}/g, username);

			axios.get(api).then(res => {
				let data = res.data;
				// resolve(data)
				this.getUserGists(username).then(gists => {
					this.getUserRepos(username).then(repos => {
						let afterTime = Date.now();
						resolve({
							type: data.type,
							username: data.name,
							avatarUrl: data.avatar_url,
							gravatarId: data.gravatar_id,
							location: data.location,
							website: data.blog,
							bio: data.bio,
							company: data.company,
							hireable: data.hireable,
							twitter: data.twitter_username,
							publicRepos: data.public_repos,
							publicGists: data.public_gists,
							followers: data.followers,
							following: data.following,
							page: data.html_url,
							gists: gists,
							repositories: repos,
							createdAt: data.created_at,
							lastUpdate: data.updated_at,
							reponseTime: afterTime - beforeTime + 'ms',
							url: data.html_url,
							repositoriesUrl: data.html_url + "?tab=repositories"
						})
					})
				})
			}).catch(err => {
				reject(err.data);
			})
		});

		this.getUserRepos = (username, repoName = false) => new Promise((resolve, reject) => {
			if (!username) return reject('missing: username parameter - read the docs: https://github-touch.github.io/');

			if (typeof repoName == "string") {
				let api = APIS.user_repository_url.replace(/{user}/g, username).replace(/{repo_name}/g, repoName);

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err.data);
				})
			} else {
				let api = APIS.user_repositories_url.replace(/{user}/g, username);

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err.data);
				})				
			}
		})

		this.getUserGists = (username, gistId = false) => new Promise((resolve, reject) => {
			if (!username) return reject('missing: username parameter - read the docs: https://github-touch.github.io/');

			if (typeof gistId == "string") {
				let api = APIS.user_gists_url.replace(/{user}/g, username) + gistId;

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err.data)
				})
			} else {
				let api = APIS.user_gists_url.replace(/{user}/g, username);

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err)
				})
			}
		});

		// organization
		this.getOrg = (organization) => new Promise((resolve, reject) => {
			if (!organization) return reject('missing: organization name- read the docs: https://github-touch.github.io')

			let api = APIS.organization_url.replace(/{org}/g, organization);

			axios.get(api).then(res => {
				let data = res.data;
				resolve(data)
			}).catch(err => {
				reject(err.data);
			})
		})		

		this.getOrgRepos = (organization, repoName = false) => new Promise((resolve, reject) => {
			if (!organization) return reject("missing: organization parameter - read the docs: https://github-touch.github.io")

			if (typeof repoName === "string") {
				let api = APIS.user_repository_url.replace(/{user}/g, organization).replace(/{repo_name}/g, repoName);

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err.data);
				})				
			} else {
				let api = APIS.organization_repositories_url.replace(/{org}/g, organization);

				axios.get(api).then(res => {
					resolve(res.data);
				}).catch(err => {
					reject(err.data);
				})				
			}	
		})

		this.getOrgTeams = (organization) => new Promise((resolve, reject) => {
			return reject({error: 'this function is currently disabled.'})

			// if (!organization) return reject("missing: organization parameter - read the docs: https://github-touch.github.io");

			// let api = APIS.organization_teams_url.replace(/{org}/g, organization);

			// axios.get(api).then(res => {
			// 	let data = res.data;
			// 	resolve(data);
			// }).catch(err => {
			// 	reject(err.data);
			// })
		})
	}
}

module.exports = GithubTouch;