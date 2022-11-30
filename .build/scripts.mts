import { execSync } from "child_process";
import moment from 'moment';
import { Path } from '../source/index.mjs';

type GitHash = string;

const get_latest_commit_hash = (): GitHash => {
	return execSync('git rev-parse --short HEAD').toString().trim();
}

const archive_package_json_lock = () => {

	const commit = get_latest_commit_hash();
	const time = moment().format("YYMMdd-hhmmss");

	const target_filename = `${time}-package-log-${commit}.json`;
	const locks_dir = new Path().child('.locks');
	const target_filepath = locks_dir.child(target_filename);
	const package_lock = new Path().child('package-lock.json');
	const saved_locks = locks_dir.files().sort((filea, fileb) => filea.name < fileb.name ? 1 : -1)
	const latest_stored_lock = saved_locks.length ? saved_locks[0] : null;

	if(latest_stored_lock) {
		if(package_lock.md5() !== latest_stored_lock.md5()) {
			console.info('archiving lock file to .locks directory as some things have changed between commits.');
			package_lock.copy(target_filepath)
		}
	}
	
}


if(import.meta.vitest) {
	
	const { describe, test, expect } = import.meta.vitest;

	describe('archive_package_json_lock', () => {

		test('get latest commit hash', async () => {
			const hash = get_latest_commit_hash();
			expect(hash).to.be.a.string;
			console.log(hash)
		});

		test('works with the minimum defaults', async () => {
			archive_package_json_lock();
		});

	});

}
