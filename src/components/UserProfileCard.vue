<script setup>
	defineProps({
		user: {
			type: Object,
			required: true,
		},
	});
</script>

<template>
	<div>
		<figure>
			<img
				:src="user.avatar"
				alt=""
				width="200"
				height="200"
				class="avatar-profile"
			/>

			<div class="mt-8 space-y-4 rounded-md p-4 shadow-md">
				<div class="flex justify-between gap-x-4">
					<div class="capitalize">
						<span class="font-semibold">Username</span>
						{{ user.username }}
					</div>

					<div class="flex gap-x-4">
						<div>
							<span class="font-semibold">Posts</span>
							{{ user.postsCount || 'No posts yet' }}
						</div>

						<div>
							<span class="block font-semibold">Threads</span>
							{{ user.threadsCount || 'No threads yet' }}
						</div>
					</div>
				</div>
				<!-- user bio -->
				<p>
					<span class="font-semibold">Bio</span>
					{{ user.bio || 'No bio yet' }}
				</p>
			</div>
		</figure>

		<router-link
			:to="{ name: 'ProfileEdit' }"
			class="mt-4 ml-auto block w-max rounded-full bg-orange-500 px-4 py-2 text-white"
		>
			Edit Profile
		</router-link>
	</div>
</template>
